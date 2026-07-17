import React from 'react';
import Hero from '../components/hero/Hero';
import AnalyticsCards from '../components/dashboard/AnalyticsCards';
import ChartsSection from '../components/dashboard/ChartsSection';
import CurrencySection from '../components/currency/CurrencySection';
import NewsSection from '../components/news/NewsSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ paddingTop: 68 }}>
      <Hero />

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', position: 'relative', zIndex: 2 }} />

      <AnalyticsCards />

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', position: 'relative', zIndex: 2 }} />

      <ChartsSection />

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', position: 'relative', zIndex: 2 }} />

      <CurrencySection />

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', position: 'relative', zIndex: 2 }} />

      <NewsSection />

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center', padding: '64px 40px',
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
              border: '1px solid rgba(59,130,246,0.15)',
              borderRadius: 28, position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 300, height: 300,
              background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 100,
              background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
              marginBottom: 20,
            }}>
              <Zap size={12} color="#c4b5fd" fill="#c4b5fd" />
              <span style={{ color: '#c4b5fd', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Get Started Free
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 800, color: '#f0f4ff',
              letterSpacing: '-0.02em', marginBottom: 16,
            }}>
              Ready to Master Global Trade?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Join thousands of trade professionals using AI-powered intelligence to make smarter decisions.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    border: 'none', borderRadius: 12, color: 'white',
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem',
                    cursor: 'pointer', boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
                  }}
                >
                  Open Trade Dashboard <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/ai">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '13px 32px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12, color: '#f0f4ff',
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                    cursor: 'pointer',
                  }}
                >
                  <Zap size={16} color="#a78bfa" />
                  Try AI Assistant
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
