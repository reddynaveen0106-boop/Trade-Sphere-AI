import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Globe from 'react-globe.gl';
import { Globe2, Zap, ArrowLeft, ArrowRight, TrendingUp, TrendingDown, Package, ShieldCheck, MapPin, Award, Activity, Heart, MessageSquare, Lightbulb } from 'lucide-react';
import { COUNTRIES_DB } from '../../data/countries';
import AIChatWidget from '../ai/AIChatWidget';

const INDIA = {
  id: "india",
  name: "India",
  flag: "🇮🇳",
  code: "IN",
  lat: 20.5937,
  lng: 78.9629,
};

const SEQUENCE_TIMING = {
  HIGHLIGHT_DURATION: 800,
  ARC_DURATION: 1200,
  POPUP_DURATION: 2500,
  FADE_DURATION: 500,
  PAUSE_BETWEEN: 0,
};

export default function Hero() {
  const globeRef = useRef(null);
  const navigate = useNavigate();
  
  // Custom responsive sizes for ~45-50% viewport height globe
  const [dimensions, setDimensions] = useState({ width: 550, height: 460 });
  const [chatOpen, setChatOpen] = useState(false);

  // Story / Sequence States
  const [storyIndex, setStoryIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupOpacity, setPopupOpacity] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  const storyTimers = useRef([]);
  const resumeTimer = useRef(null);
  const isPaused = useRef(false);

  const DYNAMIC_KEYWORDS = useMemo(() => [
    "Trade Agreements", "Country Trade Deals", "Currency Exchange",
    "Import Analysis", "Export Intelligence", "Supply Chain",
    "Trade Routes", "Global Markets", "Business Intelligence",
    "Market Opportunities", "Trade Policies", "Commodity Analysis"
  ], []);

  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    // Start dynamic keyword rotation after initial animation completes (approx 5s)
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setKeywordIndex(prev => (prev + 1) % DYNAMIC_KEYWORDS.length);
      }, 3500);
      return () => clearInterval(interval);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [DYNAMIC_KEYWORDS]);

  // Resize handler — massive globe dominating the landing page
  useEffect(() => {
    const handleResize = () => {
      const h = Math.min(window.innerHeight * 0.95, 950);
      const w = h * 1.15;
      setDimensions({ width: w, height: h });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearTimers = useCallback(() => {
    storyTimers.current.forEach(t => clearTimeout(t));
    storyTimers.current = [];
  }, []);

  const rotateToCoord = useCallback((lat, lng, altitude = 1.85, duration = 1800) => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat, lng, altitude }, duration);
    }
  }, []);

  const runStoryCycle = useCallback((index) => {
    if (isPaused.current) return;

    const country = COUNTRIES_DB[index % COUNTRIES_DB.length];
    
    setPhase('highlight');
    setHighlightedCountry(country);
    setActiveCountry(null);
    setShowPopup(false);
    setPopupOpacity(1);

    rotateToCoord(country.lat, country.lng, 1.85, 1600);

    const t1 = setTimeout(() => {
      if (isPaused.current) return;
      setPhase('arc');
      setActiveCountry(country);

      const t2 = setTimeout(() => {
        if (isPaused.current) return;
        setPhase('popup');
        setShowPopup(true);

        const t3 = setTimeout(() => {
          if (isPaused.current) return;
          setPhase('fade');
          setPopupOpacity(0);

          const t4 = setTimeout(() => {
            if (isPaused.current) return;
            setShowPopup(false);
            setActiveCountry(null);
            setHighlightedCountry(null);

            const t5 = setTimeout(() => {
              if (!isPaused.current) {
                const nextIdx = (index + 1) % COUNTRIES_DB.length;
                setStoryIndex(nextIdx);
                runStoryCycle(nextIdx);
              }
            }, SEQUENCE_TIMING.PAUSE_BETWEEN);
            storyTimers.current.push(t5);
          }, SEQUENCE_TIMING.FADE_DURATION);
          storyTimers.current.push(t4);
        }, SEQUENCE_TIMING.POPUP_DURATION);
        storyTimers.current.push(t3);
      }, SEQUENCE_TIMING.ARC_DURATION);
      storyTimers.current.push(t2);
    }, SEQUENCE_TIMING.HIGHLIGHT_DURATION);

    storyTimers.current.push(t1);
  }, [rotateToCoord]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      rotateToCoord(INDIA.lat, INDIA.lng, 1.85, 1200);
      const cycleTimer = setTimeout(() => {
        runStoryCycle(0);
      }, 1500);
      storyTimers.current.push(cycleTimer);
    }, 1200);

    return () => {
      clearTimeout(startTimer);
      clearTimers();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [runStoryCycle, rotateToCoord, clearTimers]);

  // Keep globe auto-rotation always running without pauses
  const handleUserInteraction = useCallback(() => {
    clearTimers();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      const nextIdx = (storyIndex + 1) % COUNTRIES_DB.length;
      setStoryIndex(nextIdx);
      runStoryCycle(nextIdx);
    }, 5000); // Resume story sequence next step after 5s of inactivity
  }, [storyIndex, runStoryCycle, clearTimers]);

  const handleNext = () => {
    clearTimers();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    const nextIdx = (storyIndex + 1) % COUNTRIES_DB.length;
    setStoryIndex(nextIdx);
    runStoryCycle(nextIdx);
  };

  const handlePrev = () => {
    clearTimers();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    const prevIdx = (storyIndex - 1 + COUNTRIES_DB.length) % COUNTRIES_DB.length;
    setStoryIndex(prevIdx);
    runStoryCycle(prevIdx);
  };

  const onGlobeReady = useCallback(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.25;
    }
  }, []);

  const handleExplore = useCallback(() => {
    if (activeCountry) {
      navigate(`/countries?focus=${activeCountry.id}`);
    }
  }, [activeCountry, navigate]);

  const pointsData = useMemo(() => {
    const list = [
      { lat: INDIA.lat, lng: INDIA.lng, color: '#f59e0b', size: 1.0, label: 'India' }
    ];
    if (highlightedCountry) {
      list.push({
        lat: highlightedCountry.lat,
        lng: highlightedCountry.lng,
        color: '#06b6d4',
        size: 1.4,
        label: highlightedCountry.name
      });
    }
    return list;
  }, [highlightedCountry]);

  const arcsData = useMemo(() => {
    if (!activeCountry || phase === 'highlight' || phase === 'fade') return [];
    return [
      {
        startLat: INDIA.lat,
        startLng: INDIA.lng,
        endLat: activeCountry.lat,
        endLng: activeCountry.lng,
        color: ['rgba(59, 130, 246, 0.3)', 'rgba(6, 182, 212, 0.9)']
      }
    ];
  }, [activeCountry, phase]);

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        maxHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0px 48px 16px',
        overflow: 'hidden',
        background: '#050816',
        boxSizing: 'border-box',
      }}
    >
      {/* Cinematic Starfield Background with Nebula Gradients */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 75% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 25% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
        `,
        zIndex: 0, pointerEvents: 'none'
      }} />

      {/* Grid Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Split Hero Grid Layout */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: 1600,
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        zIndex: 10,
        flexWrap: 'wrap',
        flex: 1,
      }}>
        {/* Left Side: Headline, Subtitle, CTA, Stat Grid */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(6,182,212,0.06)',
              border: '1px solid rgba(6,182,212,0.2)',
              alignSelf: 'flex-start'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'block', animation: 'pulseGlow 1.5s ease-in-out infinite' }} />
            <span style={{ color: '#67e8f9', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Decision Intelligence Corridor
            </span>
          </motion.div>

          {/* Complex Sequenced Headline */}
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            color: '#f0f4ff',
            letterSpacing: '-0.02em',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            {/* Row 1: AI Powered Global */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              {/* AI / Bulb Morph */}
              <div style={{ position: 'relative', height: '1.2em', width: '1.5em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
                  transition={{ duration: 1.2, times: [0, 0.3, 0.8, 1], ease: "easeInOut" }}
                  style={{ position: 'absolute', color: '#eab308', filter: 'drop-shadow(0 0 10px rgba(234,179,8,0.8))' }}
                >
                  <Lightbulb size={36} fill="#eab308" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  AI
                </motion.div>
              </div>
              
              {/* Powered */}
              <div style={{ overflow: 'hidden', height: '1.2em' }}>
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'center', height: '100%' }}
                >
                  Powered
                </motion.div>
              </div>
              
              {/* Global with Animated O */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span>Gl</span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  style={{ 
                    width: '0.75em', height: '0.75em', 
                    borderRadius: '50%', 
                    background: 'radial-gradient(circle at 30% 30%, #3b82f6, #06b6d4)',
                    margin: '0 2px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(6,182,212,0.6)'
                  }}
                >
                  <Globe2 size={18} color="rgba(255,255,255,0.9)" />
                </motion.div>
                <span>bal</span>
              </motion.div>
            </div>

            {/* Row 2: Trade */}
            <div style={{ overflow: 'hidden', height: '1.2em' }}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.0, duration: 0.6, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  height: '100%'
                }}
              >
                Trade
              </motion.div>
            </div>

            {/* Row 3: Decision Intelligence */}
            <div style={{ overflow: 'hidden', height: '1.2em' }}>
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ delay: 3.6, duration: 0.8, ease: 'easeInOut' }}
                style={{ height: '100%', whiteSpace: 'nowrap' }}
              >
                Decision Intelligence
              </motion.div>
            </div>

            {/* Row 4: Platform + Dynamic Keywords */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', height: '1.2em', position: 'relative' }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.4, duration: 0.5 }}
                style={{ height: '100%' }}
              >
                Platform for
              </motion.span>
              <div style={{ position: 'relative', flex: 1, minWidth: '300px', height: '100%', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={keywordIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ 
                      position: 'absolute', 
                      color: '#06b6d4', 
                      top: 0,
                      left: 0,
                      whiteSpace: 'nowrap',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {DYNAMIC_KEYWORDS[keywordIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.2, duration: 0.8 }}
            style={{
              color: '#94a3b8',
              fontSize: 'clamp(0.8rem, 1.4vw, 0.92rem)',
              lineHeight: 1.5,
              maxWidth: 420,
              margin: '8px 0 0 0',
            }}
          >
            Understand Global Trade. <span style={{ color: '#06b6d4', fontWeight: 600 }}>Analyze Markets.</span><br />
            Make Better Decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 6.0, duration: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}
          >
            <motion.button
              onClick={() => {
                document.getElementById('analytics')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                border: 'none', borderRadius: 12,
                color: 'white', fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700, fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
              }}
            >
              <Globe2 size={16} />
              Explore Globe
            </motion.button>

            <motion.button
              onClick={() => setChatOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 28px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600, fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              <Zap size={16} color="#a78bfa" />
              Ask AI
            </motion.button>
          </motion.div>

          {/* Stats Sub-header */}
          <div style={{
            fontSize: '0.72rem', color: '#64748b', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 12
          }}>
            • Live Trade Intelligence
          </div>

          {/* 4 Stat Cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12, maxWidth: 540
          }}>
            {[
              { val: '195+', lbl: 'Countries' },
              { val: '500+', lbl: 'Trade Agreements' },
              { val: '20K+', lbl: 'Trade Routes' },
              { val: '150+', lbl: 'Currencies' }
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(16, 24, 39, 0.4)',
                border: '1px solid rgba(59, 130, 246, 0.12)',
                borderRadius: 14, padding: '12px 14px',
                textAlign: 'left',
              }}>
                <h4 style={{
                  fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800, color: '#f0f4ff', margin: '0 0 2px'
                }}>{stat.val}</h4>
                <p style={{ fontSize: '0.68rem', color: '#64748b', margin: 0, fontWeight: 500 }}>{stat.lbl}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Giant Earth Centerpiece & Controls */}
        <div style={{
          flex: '1.5 1 800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Globe & Flanking Arrows */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 8,
            position: 'relative'
          }}>
            {/* Left Control Arrow */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1, background: 'rgba(6, 182, 212, 0.12)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                zIndex: 10, width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(16, 24, 39, 0.6)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: '#67e8f9', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}
            >
              <ArrowLeft size={16} />
            </motion.button>

            {/* Realistic Globe Container */}
            <div
              onMouseDown={handleUserInteraction}
              onTouchStart={handleUserInteraction}
              style={{
                width: dimensions.width,
                height: dimensions.height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: isInteracting ? 'grabbing' : 'grab',
                position: 'relative'
              }}
            >
              <Globe
                ref={globeRef}
                onGlobeReady={onGlobeReady}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                
                // Texture sets
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                
                // Blue atmosphere glow
                showAtmosphere={true}
                atmosphereColor="#3b82f6"
                atmosphereAltitude={0.16}

                // Curved route styling
                arcsData={arcsData}
                arcColor="color"
                arcStroke={1.8}
                arcDashLength={0.35}
                arcDashGap={0.65}
                arcDashAnimateTime={2000}
                arcAltitude={0.25}

                // Hotspots
                pointsData={pointsData}
                pointColor="color"
                pointRadius="size"
                pointAltitude={0.02}
              />

              {/* Glassmorphism Popup Details Panel */}
              <AnimatePresence>
                {showPopup && activeCountry && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: popupOpacity, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -15 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      right: '-25px',
                      top: '12%',
                      width: 290,
                      background: 'rgba(10, 15, 30, 0.85)',
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: 20,
                      padding: 16,
                      boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(6, 182, 212, 0.1)',
                      zIndex: 100,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: '1.8rem' }}>{activeCountry.flag}</span>
                      <div>
                        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.92rem', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
                          {activeCountry.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                          <Award size={11} color="#f59e0b" />
                          <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500 }}>
                            Trade Rank #{activeCountry.tradeRank}
                          </span>
                        </div>
                      </div>
                      <span style={{ marginLeft: 'auto', fontSize: '0.62rem', padding: '2px 7px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#6ee7b7', fontWeight: 600 }}>LIVE</span>
                    </div>

                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 10 }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                      <div style={{ padding: '8px 10px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 10 }}>
                        <div style={{ fontSize: '0.58rem', color: '#60a5fa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <TrendingUp size={9} /> IMPORTS
                        </div>
                        <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif', marginTop: 2 }}>{activeCountry.imports}</p>
                      </div>
                      <div style={{ padding: '8px 10px', background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.12)', borderRadius: 10 }}>
                        <div style={{ fontSize: '0.58rem', color: '#67e8f9', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <TrendingDown size={9} /> EXPORTS
                        </div>
                        <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif', marginTop: 2 }}>{activeCountry.exports}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10, fontSize: '0.7rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                        <span>Nominal GDP:</span>
                        <span style={{ color: '#f0f4ff', fontWeight: 600 }}>{activeCountry.gdp}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                        <span>Top Commodity:</span>
                        <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{activeCountry.topCommodity}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                        <span>Treaties:</span>
                        <span style={{ color: '#6ee7b7', fontWeight: 600 }}>{activeCountry.tradeAgreements} Active</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                        <span>Market Potential:</span>
                        <span style={{ color: '#fcd34d', fontWeight: 600 }}>{activeCountry.marketPotential}</span>
                      </div>
                    </div>

                    <div style={{
                      padding: '8px 10px', background: 'rgba(59,130,246,0.04)',
                      border: '1px solid rgba(59,130,246,0.1)', borderRadius: 10,
                      fontSize: '0.66rem', lineHeight: 1.35, color: '#bfdbfe', marginBottom: 10
                    }}>
                      💡 <strong>AI:</strong> {activeCountry.aiInsight}
                    </div>

                    <button
                      onClick={handleExplore}
                      style={{
                        width: '100%', padding: '9px 12px',
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(6,182,212,0.8))',
                        border: 'none', borderRadius: 10,
                        color: 'white', fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600, fontSize: '0.78rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                      }}
                      onMouseEnter={e => e.target.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)'}
                      onMouseLeave={e => e.target.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(6,182,212,0.8))'}
                    >
                      Explore Country <ArrowRight size={11} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Control Arrow */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, background: 'rgba(6, 182, 212, 0.12)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                zIndex: 10, width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(16, 24, 39, 0.6)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: '#67e8f9', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}
            >
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Nancy AI Intro & Live Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          background: 'rgba(10, 15, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          borderRadius: 22,
          padding: '16px 24px',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          boxSizing: 'border-box',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          zIndex: 10,
        }}
      >
        {/* Ticker Section */}
        <div style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}>
          {[
            { tag: 'Top Trade Story', title: 'India - UAE trade crossed', detail: '$100B in 2024 ↗' },
            { tag: 'Rising Market', title: 'Vietnam imports rising', detail: '23% this quarter ↗' },
            { tag: 'Currency Watch', title: 'INR strengthened by', detail: '1.2% this week ↗' },
            { tag: 'Trade Insight', title: 'Electronics exports up', detail: '18% from India ↗' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', gap: 3, flex: '1 1 180px'
            }}>
              <span style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                💡 {item.tag}
              </span>
              <p style={{ fontSize: '0.78rem', color: '#f0f4ff', margin: 0, lineHeight: 1.3 }}>
                {item.title} <span style={{ color: '#67e8f9', fontWeight: 600 }}>{item.detail}</span>
              </p>
            </div>
          ))}
        </div>

        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} className="desktop-only" />

        {/* Nancy Assistant Intro Section */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem'
            }}>
              🤖
            </div>
            <div style={{
              position: 'absolute', bottom: 1, right: 1,
              width: 10, height: 10, borderRadius: '50%',
              background: '#10b981', border: '2px solid #050816',
              animation: 'pulseGlow 1.5s infinite'
            }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h5 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f0f4ff', margin: '0 0 2px' }}>Hi, I'm Nancy</h5>
            <p style={{ fontSize: '0.68rem', color: '#64748b', margin: 0 }}>Your AI Trade Assistant</p>
          </div>
          <motion.button
            onClick={() => setChatOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: '10px 18px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              color: '#67e8f9',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <MessageSquare size={13} /> Ask Nancy
          </motion.button>
        </div>
      </motion.div>

      {/* Embedded/Connected Nancy AI Chat panel */}
      {chatOpen && (
        <AIChatWidget forceOpen={true} onClose={() => setChatOpen(false)} />
      )}
    </section>
  );
}
