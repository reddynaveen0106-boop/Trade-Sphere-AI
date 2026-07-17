import React from 'react';
import { motion } from 'framer-motion';
import AnalyticsCards from '../components/dashboard/AnalyticsCards';
import ChartsSection from '../components/dashboard/ChartsSection';
import { BarChart2, RefreshCw } from 'lucide-react';

export default function TradeDashboard() {
  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 16,
          }}>
            <BarChart2 size={12} color="#c4b5fd" />
            <span style={{ color: '#c4b5fd', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Dashboard</span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Trade Analytics Dashboard
          </h1>
          <p style={{ color: '#94a3b8' }}>Comprehensive overview of India's global trade performance.</p>
        </motion.div>
      </div>
      <AnalyticsCards />
      <ChartsSection />
    </div>
  );
}
