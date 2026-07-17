import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Eye, EyeOff, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [tab, setTab] = useState('login'); // login | signup

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div style={{
      paddingTop: 68, minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '68px 24px 24px',
    }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(59,130,246,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(10, 15, 30, 0.92)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 24, padding: '40px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
          position: 'relative', zIndex: 2,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Globe2 size={22} color="#3b82f6" />
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
              Trade<span style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Intelligence</span>
            </span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em', marginBottom: 6 }}>
            {tab === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            {tab === 'login' ? 'Sign in to access your trade intelligence' : 'Start your global trade journey'}
          </p>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {['login', 'signup'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '8px', borderRadius: 9, border: 'none',
              background: tab === t ? 'rgba(59,130,246,0.15)' : 'transparent',
              color: tab === t ? '#93c5fd' : '#64748b',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {t === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tab === 'signup' && (
            <div>
              <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full Name</label>
              <input
                type="text" placeholder="John Smith"
                style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#f0f4ff', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
              />
            </div>
          )}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
            <input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@company.com"
              style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#f0f4ff', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 44px 12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#f0f4ff', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none', borderRadius: 12,
              color: 'white', fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
              marginTop: 4,
            }}
          >
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </motion.button>

          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', position: 'absolute', inset: 0, top: '50%' }} />
            <span style={{ position: 'relative', background: 'rgba(10,15,30,0.92)', padding: '0 12px', color: '#475569', fontSize: '0.78rem' }}>or continue with</span>
          </div>

          <button style={{
            width: '100%', padding: '12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#94a3b8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.88rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: '1.1rem' }}>G</span> Continue with Google
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: '#475569' }}>
          {tab === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem' }}>
            {tab === 'login' ? 'Sign up free' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
