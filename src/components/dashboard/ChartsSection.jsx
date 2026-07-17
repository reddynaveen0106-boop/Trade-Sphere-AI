import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { TRADE_GROWTH_DATA, COMMODITY_DATA, COUNTRY_COMPARISON_DATA } from '../../data/mockData';

const CHART_COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10,
      padding: '10px 14px', fontSize: '0.8rem',
    }}>
      <p style={{ color: '#94a3b8', marginBottom: 4, fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: <span style={{ color: '#f0f4ff' }}>{p.value}B</span>
        </p>
      ))}
    </div>
  );
};

const ChartCard = ({ title, subtitle, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{
      background: 'rgba(10, 15, 30, 0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 20,
      padding: '24px',
      overflow: 'hidden',
    }}
  >
    <h3 style={{
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem',
      fontWeight: 700, color: '#f0f4ff', marginBottom: 4,
    }}>{title}</h3>
    {subtitle && <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 20 }}>{subtitle}</p>}
    {children}
  </motion.div>
);

export default function ChartsSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.2)',
            marginBottom: 16,
          }}>
            <span style={{ color: '#67e8f9', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Analytics
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700, color: '#f0f4ff', marginBottom: 10,
          }}>
            Trade Analytics Dashboard
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
            Visualize trends, compare economies, and discover trade opportunities.
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>

          {/* Trade Growth Area Chart */}
          <ChartCard
            title="Trade Growth 2024"
            subtitle="Monthly exports vs imports (USD Billion)"
            delay={0}
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={TRADE_GROWTH_DATA}>
                <defs>
                  <linearGradient id="exportGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="importGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="exports" name="Exports" stroke="#3b82f6" strokeWidth={2} fill="url(#exportGrad)" />
                <Area type="monotone" dataKey="imports" name="Imports" stroke="#06b6d4" strokeWidth={2} fill="url(#importGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Country Comparison Bar Chart */}
          <ChartCard
            title="Country Comparison"
            subtitle="Imports vs Exports by country (USD Billion)"
            delay={0.08}
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={COUNTRY_COMPARISON_DATA} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="country" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="exports" name="Exports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="imports" name="Imports" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Commodity Breakdown Pie */}
          <ChartCard
            title="Commodity Breakdown"
            subtitle="Share of total trade volume by sector"
            delay={0.12}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <ResponsiveContainer width="55%" height={200}>
                <PieChart>
                  <Pie
                    data={COMMODITY_DATA}
                    cx="50%" cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {COMMODITY_DATA.map((entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10,15,30,0.95)', border: '1px solid rgba(59,130,246,0.2)',
                      borderRadius: 8, fontSize: '0.78rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {COMMODITY_DATA.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: CHART_COLORS[i], flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', flex: 1 }}>{item.name}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f0f4ff' }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* Trade Trend Line */}
          <ChartCard
            title="Import vs Export Trend"
            subtitle="Year-on-year comparison (USD Billion)"
            delay={0.16}
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={TRADE_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="exports" name="Exports" stroke="#10b981" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="imports" name="Imports" stroke="#f59e0b" strokeWidth={2.5} dot={false} strokeDasharray="6 3" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .charts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
