import React from 'react';
import { motion } from 'framer-motion';
import CurrencySection from '../components/currency/CurrencySection';
import { DollarSign } from 'lucide-react';

export default function Currency() {
  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 8 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: 16,
          }}>
            <DollarSign size={12} color="#fcd34d" />
            <span style={{ color: '#fcd34d', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Forex</span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Currency Exchange Rates
          </h1>
          <p style={{ color: '#94a3b8' }}>
            Real-time forex rates and smart currency converter for trade professionals.
          </p>
        </motion.div>
      </div>
      <CurrencySection />
    </div>
  );
}
