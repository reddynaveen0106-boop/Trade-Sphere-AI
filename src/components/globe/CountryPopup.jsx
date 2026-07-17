import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Package, Lightbulb, ArrowRight, Star, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CountryPopup({ country, opacity, onExplore }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20, x: 20 }}
      animate={{ opacity: opacity, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        position: 'absolute',
        right: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 280,
        background: 'rgba(10, 15, 30, 0.92)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(6, 182, 212, 0.25)',
        borderRadius: 20,
        padding: '20px',
        boxShadow: `
          0 0 0 1px rgba(6,182,212,0.1),
          0 20px 60px rgba(0,0,0,0.6),
          0 0 40px rgba(6,182,212,0.08)
        `,
        zIndex: 100,
        pointerEvents: opacity < 0.5 ? 'none' : 'auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          fontSize: '2.2rem', lineHeight: 1,
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
        }}>
          {country.flag}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1rem', fontWeight: 700,
            color: '#f0f4ff', letterSpacing: '-0.01em',
            marginBottom: 2,
          }}>
            {country.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Star size={11} color="#f59e0b" fill="#f59e0b" />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
              Trade Rank #{country.tradeRank}
            </span>
          </div>
        </div>
        {/* Live indicator */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '3px 8px', borderRadius: 100,
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#10b981', animation: 'pulseGlow 1.5s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '0.65rem', color: '#6ee7b7', fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} />

      {/* Trade Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div style={{
          padding: '10px 12px',
          background: 'rgba(59,130,246,0.08)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <TrendingUp size={11} color="#60a5fa" />
            <span style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Imports</span>
          </div>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif' }}>
            {country.imports}
          </p>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>from India</span>
        </div>
        <div style={{
          padding: '10px 12px',
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.15)',
          borderRadius: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
            <TrendingDown size={11} color="#67e8f9" />
            <span style={{ fontSize: '0.65rem', color: '#67e8f9', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Exports</span>
          </div>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif' }}>
            {country.exports}
          </p>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>to India</span>
        </div>
      </div>

      {/* Top Commodity */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px',
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.15)',
        borderRadius: 10,
        marginBottom: 10,
      }}>
        <Package size={13} color="#c4b5fd" />
        <div>
          <span style={{ fontSize: '0.65rem', color: '#c4b5fd', display: 'block', fontWeight: 600 }}>TOP COMMODITY</span>
          <span style={{ fontSize: '0.82rem', color: '#f0f4ff', fontWeight: 500 }}>{country.topCommodity}</span>
        </div>
      </div>

      {/* Fact */}
      <div style={{
        padding: '8px 12px',
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.12)',
        borderRadius: 10,
        marginBottom: 10,
        fontSize: '0.75rem',
        color: '#fcd34d',
        lineHeight: 1.5,
      }}>
        📌 {country.fact}
      </div>

      {/* AI Insight */}
      <div style={{
        display: 'flex', gap: 8,
        padding: '8px 12px',
        background: 'rgba(59,130,246,0.06)',
        border: '1px solid rgba(59,130,246,0.12)',
        borderRadius: 10,
        marginBottom: 14,
      }}>
        <Lightbulb size={13} color="#93c5fd" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: '0.73rem', color: '#bfdbfe', lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: '#93c5fd' }}>AI Insight: </strong>
          {country.aiInsight}
        </p>
      </div>

      {/* Explore Button */}
      <button
        onClick={onExplore}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '10px 16px',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(6,182,212,0.8))',
          border: 'none', borderRadius: 10,
          color: 'white', fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600, fontSize: '0.85rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.target.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.target.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.8), rgba(6,182,212,0.8))';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Explore {country.name}
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}
