import React, {
  useEffect, useRef, useState, useCallback, useMemo
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TRADING_COUNTRIES, INDIA } from '../../data/mockData';
import CountryPopup from './CountryPopup';

// ── Utility: great-circle arc interpolation ──────────────────────────────────
function toRad(deg) { return (deg * Math.PI) / 180; }
function toDeg(rad) { return (rad * 180) / Math.PI; }

function interpolateGreatCircle(from, to, steps = 60) {
  const lat1 = toRad(from.lat), lon1 = toRad(from.lng);
  const lat2 = toRad(to.lat),   lon2 = toRad(to.lng);
  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2)
  ));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    pts.push({ lat: toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), lng: toDeg(Math.atan2(y, x)) });
  }
  return pts;
}

// ── Canvas-based Globe ────────────────────────────────────────────────────────
function drawGlobe(canvas, state) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W, H) * 0.38;

  ctx.clearRect(0, 0, W, H);

  const { rotX, rotY, activeCountry, arcProgress, highlightedCountry } = state;

  // ── Project lat/lng → canvas x,y (simple orthographic) ──
  const project = (lat, lng) => {
    const la = toRad(lat);
    const lo = toRad(lng - rotY);
    const sinLo = Math.sin(lo);
    const cosLo = Math.cos(lo);
    const sinLa = Math.sin(la);
    const cosLa = Math.cos(la);
    const x = R * cosLa * sinLo;
    const y = R * (-sinLa * Math.sin(toRad(rotX)) + cosLa * cosLo * Math.cos(toRad(rotX)));
    const z = sinLa * Math.cos(toRad(rotX)) + cosLa * cosLo * Math.sin(toRad(rotX));
    return { x: cx + x, y: cy + y, visible: z > 0 };
  };

  // ── Atmosphere glow ──
  const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.2);
  atmoGrad.addColorStop(0, 'rgba(59,130,246,0.12)');
  atmoGrad.addColorStop(0.5, 'rgba(6,182,212,0.05)');
  atmoGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2);
  ctx.fillStyle = atmoGrad;
  ctx.fill();

  // ── Globe body ──
  const globeGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
  globeGrad.addColorStop(0, '#0d1b3e');
  globeGrad.addColorStop(0.5, '#071228');
  globeGrad.addColorStop(1, '#020811');
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = globeGrad;
  ctx.fill();

  // ── Clip to globe ──
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.clip();

  // ── Grid lines ──
  ctx.strokeStyle = 'rgba(59,130,246,0.08)';
  ctx.lineWidth = 0.5;
  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    ctx.beginPath();
    let first = true;
    for (let lng = -180; lng <= 180; lng += 3) {
      const p = project(lat, lng);
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  // Longitude lines
  for (let lng = -180; lng <= 180; lng += 20) {
    ctx.beginPath();
    let first = true;
    for (let lat = -90; lat <= 90; lat += 3) {
      const p = project(lat, lng);
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  ctx.restore();

  // ── Globe border ──
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(59,130,246,0.25)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // ── Shine ──
  const shineGrad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx, cy, R);
  shineGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
  shineGrad.addColorStop(0.4, 'rgba(255,255,255,0.01)');
  shineGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = shineGrad;
  ctx.fill();

  // ── Draw trade arc ──
  if (activeCountry && arcProgress > 0) {
    const arcPts = interpolateGreatCircle(INDIA, activeCountry, 80);
    const visibleCount = Math.floor(arcProgress * arcPts.length);
    if (visibleCount > 1) {
      const projected = arcPts.slice(0, visibleCount).map(p => project(p.lat, p.lng));
      const visiblePts = projected.filter(p => p.visible);

      if (visiblePts.length > 1) {
        // Glow trail
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(6,182,212,0.8)';
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < projected.length; i++) {
          if (projected[i].visible && projected[i - 1].visible) {
            ctx.lineTo(projected[i].x, projected[i].y);
          } else {
            ctx.moveTo(projected[i].x, projected[i].y);
          }
        }
        ctx.strokeStyle = 'rgba(6,182,212,0.9)';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        // Core line
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < projected.length; i++) {
          if (projected[i].visible && projected[i - 1].visible) {
            ctx.lineTo(projected[i].x, projected[i].y);
          } else {
            ctx.moveTo(projected[i].x, projected[i].y);
          }
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Moving particle
        const particleIdx = Math.min(Math.floor(arcProgress * projected.length) - 1, projected.length - 1);
        if (particleIdx >= 0 && projected[particleIdx].visible) {
          const pp = projected[particleIdx];
          ctx.save();
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#06b6d4';
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#67e8f9';
          ctx.fill();
          ctx.restore();
        }
      }
    }
  }

  // ── Draw country markers ──
  const drawMarker = (country, isIndia = false) => {
    const p = project(country.lat, country.lng);
    if (!p.visible) return;

    const isActive = activeCountry && activeCountry.id === country.id;
    const isHighlighted = highlightedCountry && highlightedCountry.id === country.id;

    const baseR = isIndia ? 6 : 4;
    const glowR = isActive ? baseR * 3.5 : isHighlighted ? baseR * 2.5 : baseR * 2;
    const color = isIndia ? '#f59e0b' : (country.color || '#3b82f6');

    // Outer glow
    const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
    glowGrad.addColorStop(0, color + '55');
    glowGrad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Dot
    ctx.save();
    if (isActive || isHighlighted) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, isActive ? baseR + 2 : baseR, 0, Math.PI * 2);
    ctx.fillStyle = isIndia ? '#f59e0b' : (isActive ? '#67e8f9' : color + 'cc');
    ctx.fill();
    ctx.restore();

    // Ring for active
    if (isActive) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, baseR + 6, 0, Math.PI * 2);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Label
    if (isActive || isIndia) {
      ctx.font = `bold ${isIndia ? 11 : 10}px Inter, sans-serif`;
      ctx.fillStyle = isIndia ? '#fcd34d' : '#f0f4ff';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.fillText(isIndia ? '🇮🇳 India' : country.flag + ' ' + country.name, p.x, p.y - baseR - 8);
      ctx.shadowBlur = 0;
    }
  };

  // Draw India first
  drawMarker(INDIA, true);

  // Draw trading countries
  TRADING_COUNTRIES.forEach(country => {
    drawMarker(country, false);
  });
}

// ── Main GlobeSection Component ───────────────────────────────────────────────
const SEQUENCE_TIMING = {
  HIGHLIGHT_DURATION: 1200,  // ms to highlight before arc starts
  ARC_DURATION: 2500,        // ms for arc animation
  POPUP_DURATION: 5500,      // ms popup stays visible
  FADE_DURATION: 800,        // ms to fade out
  PAUSE_BETWEEN: 1000,       // ms between countries
};

export default function GlobeSection() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const navigate = useNavigate();

  // Globe rotation state
  const rotRef = useRef({ x: -20, y: 0 });           // current rotation
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const autoResumeTimerRef = useRef(null);
  const storyPausedRef = useRef(false);

  // Story mode state
  const [storyIndex, setStoryIndex] = useState(0);
  const [phase, setPhase] = useState('highlight'); // highlight | arc | popup | fadeout
  const [arcProgress, setArcProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupCountry, setPopupCountry] = useState(null);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [popupOpacity, setPopupOpacity] = useState(1);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const storyTimersRef = useRef([]);
  const arcAnimRef = useRef(null);
  const arcStartRef = useRef(null);

  // ── Clear all story timers ──
  const clearStoryTimers = useCallback(() => {
    storyTimersRef.current.forEach(t => clearTimeout(t));
    storyTimersRef.current = [];
    if (arcAnimRef.current) cancelAnimationFrame(arcAnimRef.current);
  }, []);

  // ── Advance to next country ──
  const nextCountry = useCallback((index) => {
    if (storyPausedRef.current) return;

    const country = TRADING_COUNTRIES[index % TRADING_COUNTRIES.length];

    // Phase 1: Highlight
    setPhase('highlight');
    setHighlightedCountry(country);
    setActiveCountry(null);
    setShowPopup(false);
    setArcProgress(0);
    setPopupOpacity(1);

    const t1 = setTimeout(() => {
      if (storyPausedRef.current) return;

      // Phase 2: Animate arc
      setPhase('arc');
      setActiveCountry(country);
      arcStartRef.current = null;

      const animateArc = (timestamp) => {
        if (storyPausedRef.current) return;
        if (!arcStartRef.current) arcStartRef.current = timestamp;
        const elapsed = timestamp - arcStartRef.current;
        const progress = Math.min(elapsed / SEQUENCE_TIMING.ARC_DURATION, 1);
        // Ease in-out cubic
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        setArcProgress(eased);

        if (progress < 1) {
          arcAnimRef.current = requestAnimationFrame(animateArc);
        } else {
          // Phase 3: Show popup
          const t2 = setTimeout(() => {
            if (storyPausedRef.current) return;
            setPhase('popup');
            setPopupCountry(country);
            setShowPopup(true);

            // Phase 4: Fade out
            const t3 = setTimeout(() => {
              if (storyPausedRef.current) return;
              setPhase('fadeout');
              setPopupOpacity(0);

              const t4 = setTimeout(() => {
                if (storyPausedRef.current) return;
                setShowPopup(false);
                setActiveCountry(null);
                setHighlightedCountry(null);
                setArcProgress(0);

                const t5 = setTimeout(() => {
                  if (!storyPausedRef.current) {
                    const nextIdx = (index + 1) % TRADING_COUNTRIES.length;
                    setStoryIndex(nextIdx);
                    nextCountry(nextIdx);
                  }
                }, SEQUENCE_TIMING.PAUSE_BETWEEN);
                storyTimersRef.current.push(t5);
              }, SEQUENCE_TIMING.FADE_DURATION);
              storyTimersRef.current.push(t4);
            }, SEQUENCE_TIMING.POPUP_DURATION);
            storyTimersRef.current.push(t3);
          }, 200);
          storyTimersRef.current.push(t2);
        }
      };
      arcAnimRef.current = requestAnimationFrame(animateArc);
    }, SEQUENCE_TIMING.HIGHLIGHT_DURATION);

    storyTimersRef.current.push(t1);
  }, []);

  // ── Start story ──
  useEffect(() => {
    const startTimer = setTimeout(() => nextCountry(0), 1000);
    return () => {
      clearTimeout(startTimer);
      clearStoryTimers();
    };
  }, []);

  // ── Pause / Resume story on user interaction ──
  const pauseStory = useCallback(() => {
    storyPausedRef.current = true;
    setIsUserInteracting(true);
    clearStoryTimers();
    setShowPopup(false);
    setActiveCountry(null);
    setHighlightedCountry(null);
    setArcProgress(0);

    if (autoResumeTimerRef.current) clearTimeout(autoResumeTimerRef.current);
    autoResumeTimerRef.current = setTimeout(() => {
      storyPausedRef.current = false;
      setIsUserInteracting(false);
      const nextIdx = (storyIndex + 1) % TRADING_COUNTRIES.length;
      setStoryIndex(nextIdx);
      nextCountry(nextIdx);
    }, 3000);
  }, [storyIndex, nextCountry, clearStoryTimers]);

  // ── Globe canvas render loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const size = Math.min(canvas.parentElement.clientWidth, 620);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const render = (timestamp) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      // Auto rotate
      if (!isDraggingRef.current) {
        rotRef.current.y += 0.04;
      }

      drawGlobe(canvas, {
        rotX: rotRef.current.x,
        rotY: rotRef.current.y,
        activeCountry,
        arcProgress,
        highlightedCountry,
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [activeCountry, arcProgress, highlightedCountry]);

  // ── Mouse / Touch drag handlers ──
  const onMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    pauseStory();
  }, [pauseStory]);

  const onMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    rotRef.current.y += dx * 0.3;
    rotRef.current.x = Math.max(-60, Math.min(60, rotRef.current.x + dy * 0.3));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    isDraggingRef.current = true;
    lastMouseRef.current = { x: t.clientX, y: t.clientY };
    pauseStory();
  }, [pauseStory]);

  const onTouchMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const t = e.touches[0];
    const dx = t.clientX - lastMouseRef.current.x;
    const dy = t.clientY - lastMouseRef.current.y;
    rotRef.current.y += dx * 0.4;
    rotRef.current.x = Math.max(-60, Math.min(60, rotRef.current.x + dy * 0.4));
    lastMouseRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleExplore = useCallback(() => {
    if (popupCountry) {
      navigate(`/countries?focus=${popupCountry.id}`);
    }
  }, [popupCountry, navigate]);

  return (
    <section
      id="globe"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 40px',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 2 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 100,
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.2)',
          marginBottom: 16,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'block', animation: 'pulseGlow 1.5s ease-in-out infinite' }} />
          <span style={{ color: '#67e8f9', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Live Trade Intelligence
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 700,
          color: '#f0f4ff',
          marginBottom: 10,
        }}>
          India's Global Trade Network
        </h2>
        <p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto', fontSize: '0.95rem' }}>
          Watch how India connects to the world's largest economies through dynamic trade corridors.
        </p>
      </motion.div>

      {/* Globe + Popup container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 900,
      }}>
        {/* Globe Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          style={{ position: 'relative', cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              display: 'block',
              maxWidth: '100%',
              borderRadius: '50%',
            }}
          />
        </motion.div>

        {/* Country Popup */}
        <AnimatePresence mode="wait">
          {showPopup && popupCountry && (
            <CountryPopup
              key={popupCountry.id}
              country={popupCountry}
              opacity={popupOpacity}
              onExplore={handleExplore}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Story progress bar */}
      <div style={{
        display: 'flex', gap: 6, marginTop: 24, position: 'relative', zIndex: 2,
      }}>
        {TRADING_COUNTRIES.map((c, i) => (
          <div
            key={c.id}
            title={c.name}
            style={{
              width: 28,
              height: 3,
              borderRadius: 2,
              background: i === storyIndex % TRADING_COUNTRIES.length
                ? '#06b6d4'
                : i < storyIndex % TRADING_COUNTRIES.length
                  ? 'rgba(59,130,246,0.5)'
                  : 'rgba(255,255,255,0.1)',
              transition: 'background 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Country sequence labels */}
      <div style={{
        display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap',
        justifyContent: 'center', position: 'relative', zIndex: 2,
      }}>
        {TRADING_COUNTRIES.map((c, i) => {
          const isCurrent = i === storyIndex % TRADING_COUNTRIES.length;
          return (
            <motion.div
              key={c.id}
              animate={{
                scale: isCurrent ? 1.05 : 1,
                opacity: isCurrent ? 1 : 0.5,
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '4px 10px',
                borderRadius: 100,
                background: isCurrent ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isCurrent ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.06)'}`,
                fontSize: '0.78rem',
                color: isCurrent ? '#67e8f9' : '#94a3b8',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{c.flag}</span>
              <span style={{ fontWeight: isCurrent ? 600 : 400 }}>{c.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* User interaction hint */}
      <AnimatePresence>
        {isUserInteracting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              marginTop: 12,
              padding: '6px 16px',
              borderRadius: 100,
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              color: '#fcd34d',
              fontSize: '0.78rem',
              fontWeight: 500,
              position: 'relative', zIndex: 2,
            }}
          >
            ⏸ Story paused — resuming in 3 seconds...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
    </section>
  );
}
