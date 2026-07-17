import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe2, ArrowUpRight, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { COUNTRIES_DB } from '../data/countries';

export default function Countries() {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Read search query parameter (e.g. ?focus=usa)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const focusId = params.get('focus');
    if (focusId) {
      const match = COUNTRIES_DB.find(c => c.id === focusId);
      if (match) {
        setSearch(match.name);
      }
    }
  }, [location.search]);

  const filtered = COUNTRIES_DB.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.topCommodity.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: '#050816' }}>
      <div className="container section">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', marginBottom: 16,
          }}>
            <Globe2 size={12} color="#06b6d4" />
            <span style={{ color: '#67e8f9', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Trade Partners
            </span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Countries & Trade Database
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Explore bilateral trade metrics, nominal GDP, and AI-powered intelligence reports for {COUNTRIES_DB.length} economies.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 28 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, maxWidth: 480,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '12px 16px',
          }}>
            <Search size={18} color="#64748b" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country, currency, or commodity..."
              style={{ background: 'none', border: 'none', outline: 'none', color: '#f0f4ff', fontSize: '0.9rem', flex: 1, fontFamily: 'Inter, sans-serif' }}
            />
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 18 }}>
          {filtered.map((country, i) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              whileHover={{ y: -4, borderColor: 'rgba(6, 182, 212, 0.25)' }}
              style={{
                background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)', borderRadius: 18, padding: '20px',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: '2rem' }}>{country.flag}</span>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f4ff', margin: 0 }}>
                    {country.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Award size={11} color="#f59e0b" />
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Rank #{country.tradeRank}</span>
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 100, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', fontSize: '0.7rem', fontWeight: 600, color: '#67e8f9' }}>
                  {country.code}
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '8px 12px', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.08)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.62rem', color: '#60a5fa', fontWeight: 600, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <TrendingUp size={9} /> IMPORTS
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f4ff' }}>{country.imports}</div>
                </div>
                <div style={{ padding: '8px 12px', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.08)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.62rem', color: '#67e8f9', fontWeight: 600, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <TrendingDown size={9} /> EXPORTS
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f4ff' }}>{country.exports}</div>
                </div>
              </div>

              {/* Attributes Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14, fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>GDP Nominal:</span>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{country.gdp}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Main Export:</span>
                  <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{country.topCommodity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Risk Vector:</span>
                  <span style={{ color: country.riskLevel === 'High' ? '#fca5a5' : country.riskLevel === 'Medium' ? '#fcd34d' : '#6ee7b7', fontWeight: 600 }}>
                    {country.riskLevel}
                  </span>
                </div>
              </div>

              {/* Details Action */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>💵 Currency: {country.currency}</span>
                <button
                  onClick={() => navigate(`/dashboard?focus=${country.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'none', border: 'none', color: '#06b6d4',
                    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Dashboard <ArrowUpRight size={11} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
