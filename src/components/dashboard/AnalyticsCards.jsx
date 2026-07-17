import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, TrendingDown, Globe2, Users, Map } from 'lucide-react';
import { ANALYTICS_DATA } from '../../data/mockData';

function AnimatedNumber({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const raw = parseFloat(target.replace(/[^0-9.]/g, ''));
  const [display, setDisplay] = React.useState('0');

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (eased * raw).toFixed(raw < 10 ? 2 : 0);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, raw]);

  return (
    <span ref={ref}>
      {target.replace(/[\d.]+/, display)}
    </span>
  );
}

const CARDS = [
  {
    key: 'totalExports',
    label: 'Total Global Exports',
    icon: TrendingUp,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.15)',
    glowColor: 'rgba(16,185,129,0.2)',
  },
  {
    key: 'totalImports',
    label: 'Total Global Imports',
    icon: TrendingDown,
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.15)',
    glowColor: 'rgba(59,130,246,0.2)',
  },
  {
    key: 'tradeVolume',
    label: 'Total Trade Volume',
    icon: Globe2,
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.15)',
    glowColor: 'rgba(139,92,246,0.2)',
  },
  {
    key: 'topPartners',
    label: 'Top Trading Partners',
    icon: Users,
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.08)',
    borderColor: 'rgba(6,182,212,0.15)',
    glowColor: 'rgba(6,182,212,0.2)',
  },
  {
    key: 'countriesCovered',
    label: 'Countries Covered',
    icon: Map,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.15)',
    glowColor: 'rgba(245,158,11,0.2)',
  },
];

export default function AnalyticsCards() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.2)',
            marginBottom: 16,
          }}>
            <span style={{ color: '#c4b5fd', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Global Overview
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700, color: '#f0f4ff', marginBottom: 10,
          }}>
            Trade at a Glance
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
            Real-time intelligence on global trade volumes, partners, and market movements.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {CARDS.map((card, i) => {
            const data = ANALYTICS_DATA[card.key];
            const Icon = card.icon;
            const isUp = data.trend === 'up';

            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${card.glowColor}` }}
                style={{
                  background: 'rgba(10, 15, 30, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${card.borderColor}`,
                  borderRadius: 18,
                  padding: '24px',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute', top: -20, right: -20,
                  width: 100, height: 100,
                  background: `radial-gradient(circle, ${card.bgColor} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  background: card.bgColor,
                  border: `1px solid ${card.borderColor}`,
                  borderRadius: 12,
                  marginBottom: 16,
                }}>
                  <Icon size={20} color={card.color} />
                </div>

                <p style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  {card.label}
                </p>

                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '2rem', fontWeight: 800,
                  color: '#f0f4ff', letterSpacing: '-0.02em',
                  marginBottom: 8, lineHeight: 1,
                }}>
                  <AnimatedNumber target={data.value} />
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    padding: '2px 8px', borderRadius: 100,
                    background: isUp ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    border: `1px solid ${isUp ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    fontSize: '0.72rem', fontWeight: 600,
                    color: isUp ? '#6ee7b7' : '#fca5a5',
                  }}>
                    {isUp ? '↑' : '↓'} {data.change}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#475569' }}>vs last year</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
