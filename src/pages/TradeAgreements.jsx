import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import { TRADE_AGREEMENTS } from '../data/mockData';

const STATUS_STYLE = {
  Active: { bg: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: 'rgba(16,185,129,0.2)', icon: CheckCircle },
  Negotiating: { bg: 'rgba(245,158,11,0.1)', color: '#fcd34d', border: 'rgba(245,158,11,0.2)', icon: Clock },
  Paused: { bg: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: 'rgba(239,68,68,0.2)', icon: XCircle },
};

export default function TradeAgreements() {
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Active', 'Negotiating', 'Paused'];
  const filtered = filter === 'All' ? TRADE_AGREEMENTS : TRADE_AGREEMENTS.filter(a => a.status === filter);

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh' }}>
      <div className="container section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 16,
          }}>
            <FileText size={12} color="#6ee7b7" />
            <span style={{ color: '#6ee7b7', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Trade Agreements</span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            India's Trade Agreements
          </h1>
          <p style={{ color: '#94a3b8' }}>
            Comprehensive view of India's bilateral and multilateral trade agreements.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '8px 18px', borderRadius: 100, fontWeight: 600, fontSize: '0.82rem',
              background: filter === s ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${filter === s ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
              color: filter === s ? '#93c5fd' : '#64748b', cursor: 'pointer', transition: 'all 0.2s',
            }}>{s}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: 'rgba(10,15,30,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Agreement', 'Countries', 'Type', 'Coverage', 'Year', 'Status'].map(h => (
                  <th key={h} style={{
                    padding: '16px 20px', textAlign: 'left',
                    fontSize: '0.72rem', fontWeight: 700, color: '#64748b',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((agr, i) => {
                const st = STATUS_STYLE[agr.status];
                const StatusIcon = st.icon;
                return (
                  <motion.tr
                    key={agr.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 20px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#f0f4ff', fontSize: '0.88rem' }}>{agr.name}</td>
                    <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '0.82rem' }}>{agr.countries}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: '0.7rem', fontWeight: 600 }}>{agr.type}</span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '0.82rem' }}>{agr.coverage}</td>
                    <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '0.82rem' }}>{agr.year || 'TBD'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '4px 10px', borderRadius: 100,
                        background: st.bg, border: `1px solid ${st.border}`,
                        color: st.color, fontSize: '0.72rem', fontWeight: 600,
                      }}>
                        <StatusIcon size={10} />
                        {agr.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
