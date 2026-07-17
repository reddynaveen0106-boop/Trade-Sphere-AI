import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, ArrowRight, X } from 'lucide-react';
import { CURRENCIES } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function CurrencySection() {
  const [showConverter, setShowConverter] = useState(false);
  const [amount, setAmount] = useState('1000');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('INR');

  const rates = { USD: 83.42, EUR: 90.15, GBP: 105.78, JPY: 0.5512, AED: 22.71, CNY: 11.52, INR: 1 };
  const converted = ((parseFloat(amount) || 0) * rates[fromCurr] / rates[toCurr]).toFixed(2);

  return (
    <section className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            marginBottom: 16,
          }}>
            <span style={{ color: '#fcd34d', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Forex
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700, color: '#f0f4ff', marginBottom: 10,
          }}>
            Currency Exchange Rates
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
            Live exchange rates for key trade currencies against INR.
          </p>
        </motion.div>

        {/* Currency Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
          {CURRENCIES.map((curr, i) => (
            <motion.div
              key={curr.pair}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, borderColor: 'rgba(245,158,11,0.3)' }}
              style={{
                background: 'rgba(10,15,30,0.7)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '18px 20px',
                transition: 'all 0.2s ease', cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.4rem' }}>{curr.flag}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8' }}>{curr.pair}</span>
                </div>
                {curr.trend === 'up'
                  ? <TrendingUp size={14} color="#10b981" />
                  : <TrendingDown size={14} color="#ef4444" />
                }
              </div>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1.7rem', fontWeight: 800,
                color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 4,
              }}>
                ₹{curr.rate}
              </p>
              <span style={{
                fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 100,
                background: curr.trend === 'up' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: curr.trend === 'up' ? '#6ee7b7' : '#fca5a5',
                border: `1px solid ${curr.trend === 'up' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}>
                {curr.change} today
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <motion.button
            onClick={() => setShowConverter(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 12, color: '#fcd34d',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={16} />
            Open Currency Converter
          </motion.button>
        </div>
      </div>

      {/* Converter Modal */}
      <AnimatePresence>
        {showConverter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={e => e.target === e.currentTarget && setShowConverter(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: '#0a0f1e', border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 24, padding: '32px', width: '100%', maxWidth: 420,
                boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#f0f4ff', fontSize: '1.1rem' }}>
                  Currency Converter
                </h3>
                <button onClick={() => setShowConverter(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Amount */}
              <label style={{ display: 'block', marginBottom: 16 }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Amount</span>
                <input
                  type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10, color: '#f0f4ff', fontSize: '1.2rem', fontWeight: 700,
                    fontFamily: 'Space Grotesk, sans-serif', outline: 'none',
                  }}
                />
              </label>

              {/* From / To */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'end', marginBottom: 24 }}>
                <label>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 8 }}>From</span>
                  <select value={fromCurr} onChange={e => setFromCurr(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10, color: '#f0f4ff', fontSize: '0.9rem', outline: 'none',
                    }}
                  >
                    {Object.keys(rates).map(c => <option key={c} value={c} style={{ background: '#0a0f1e' }}>{c}</option>)}
                  </select>
                </label>
                <div style={{ padding: '10px', color: '#64748b', textAlign: 'center', paddingBottom: 11 }}>⇄</div>
                <label>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 8 }}>To</span>
                  <select value={toCurr} onChange={e => setToCurr(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10, color: '#f0f4ff', fontSize: '0.9rem', outline: 'none',
                    }}
                  >
                    {Object.keys(rates).map(c => <option key={c} value={c} style={{ background: '#0a0f1e' }}>{c}</option>)}
                  </select>
                </label>
              </div>

              {/* Result */}
              <div style={{
                padding: '20px', borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.04))',
                border: '1px solid rgba(245,158,11,0.2)', textAlign: 'center',
              }}>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: 6 }}>
                  {amount} {fromCurr} =
                </p>
                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', fontWeight: 800,
                  color: '#fcd34d', letterSpacing: '-0.02em',
                }}>
                  {converted} {toCurr}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
