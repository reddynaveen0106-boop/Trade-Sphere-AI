import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Zap, Shield, Users, BarChart2, Target } from 'lucide-react';

const FEATURES = [
  { icon: Globe2, color: '#3b82f6', title: '195+ Countries', desc: 'Complete bilateral trade data for every nation on Earth.' },
  { icon: Zap, color: '#8b5cf6', title: 'AI-Powered Insights', desc: 'Machine learning models analyze trade patterns in real-time.' },
  { icon: BarChart2, color: '#06b6d4', title: 'Live Analytics', desc: 'Dynamic dashboards with live trade volume and trends.' },
  { icon: Shield, color: '#10b981', title: 'Verified Data', desc: 'Sourced from WTO, DGFT, and leading trade agencies.' },
  { icon: Users, color: '#f59e0b', title: 'For Professionals', desc: 'Built for exporters, policy makers, and trade analysts.' },
  { icon: Target, color: '#ef4444', title: 'Smart Alerts', desc: 'Get notified about tariff changes and trade agreement updates.' },
];

export default function About() {
  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      <div className="container section">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 20,
          }}>
            <span style={{ color: '#93c5fd', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Mission</span>
          </div>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
            color: '#f0f4ff', letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.1,
          }}>
            Making Global Trade<br />
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Intelligent & Accessible</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.75 }}>
            Trade Intelligence is the world's most advanced AI-powered trade analytics platform, helping exporters, importers, and policy makers navigate the complexities of global commerce.
          </p>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 72 }}>
          {[
            { value: '195+', label: 'Countries' },
            { value: '$1.67T', label: 'Trade Tracked' },
            { value: '10K+', label: 'Professionals' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16 }}
            >
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 4 }}>{stat.value}</p>
              <p style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#f0f4ff', textAlign: 'center', marginBottom: 36 }}>
          Why Trade Intelligence?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                style={{ padding: '24px', background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}14`, border: `1px solid ${f.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={f.color} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#f0f4ff', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
