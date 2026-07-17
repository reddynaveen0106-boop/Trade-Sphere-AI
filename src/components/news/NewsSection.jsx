import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { NEWS_DATA } from '../../data/mockData';

const CATEGORY_COLORS = {
  'Trade Agreement': { bg: 'rgba(59,130,246,0.1)', color: '#93c5fd', border: 'rgba(59,130,246,0.2)' },
  'Export Growth': { bg: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: 'rgba(16,185,129,0.2)' },
  'Currency': { bg: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: 'rgba(245,158,11,0.2)' },
  'Trade Deal': { bg: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: 'rgba(139,92,246,0.2)' },
  'Textile': { bg: 'rgba(6,182,212,0.1)', color: '#67e8f9', border: 'rgba(6,182,212,0.2)' },
  'Technology': { bg: 'rgba(236,72,153,0.1)', color: '#f9a8d4', border: 'rgba(236,72,153,0.2)' },
};

export default function NewsSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}
        >
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              marginBottom: 12,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', animation: 'pulseGlow 1.5s ease-in-out infinite' }} />
              <span style={{ color: '#fca5a5', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Breaking Trade News
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              fontWeight: 700, color: '#f0f4ff',
            }}>
              Latest Trade Intelligence
            </h2>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 18px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#94a3b8', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
          }}>
            View All <ArrowRight size={14} />
          </button>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
          {NEWS_DATA.map((item, i) => {
            const catStyle = CATEGORY_COLORS[item.category] || CATEGORY_COLORS['Trade Agreement'];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.2)' }}
                style={{
                  background: 'rgba(10,15,30,0.7)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 18, padding: '22px',
                  cursor: 'pointer', transition: 'all 0.25s ease',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.3rem' }}>{item.flag}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{item.country}</span>
                  </div>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100,
                    background: catStyle.bg, color: catStyle.color,
                    border: `1px solid ${catStyle.border}`,
                    fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {item.category}
                  </span>
                </div>

                {/* Headline */}
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.92rem', fontWeight: 700,
                  color: '#f0f4ff', lineHeight: 1.45,
                  marginBottom: 10, flex: 1,
                }}>
                  {item.headline}
                </h3>

                <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>
                  {item.summary}
                </p>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={11} color="#475569" />
                    <span style={{ fontSize: '0.72rem', color: '#475569' }}>{item.time}</span>
                  </div>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'none', border: 'none',
                    color: '#3b82f6', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  }}>
                    Read More <ExternalLink size={11} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
