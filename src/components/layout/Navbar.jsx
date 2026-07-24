import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Search, Menu, X, Zap, ChevronDown, Bell, User } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Countries', path: '/countries' },
  { label: 'Trade Dashboard', path: '/dashboard' },
  { label: 'Trade Agreements', path: '/agreements' },
  { label: 'Currency', path: '/currency' },
  { label: 'AI Assistant', path: '/ai' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          background: scrolled
            ? 'rgba(5, 8, 22, 0.95)'
            : 'rgba(5, 8, 22, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(59,130,246,0.15)'
            : '1px solid rgba(255,255,255,0.04)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo & Brand Presentation */}
        <Link 
          to="/" 
          className="brand-logo-container"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexShrink: 0,
            padding: '4px 0',
            transition: 'all 300ms ease',
            position: 'relative',
            marginRight: '36px', // plenty of spacing
          }}
        >
          {/* Subtle blue glow behind the logo */}
          <div className="logo-hover-glow" style={{
            position: 'absolute',
            width: '100%', height: '100%',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0) 0%, transparent 70%)',
            filter: 'blur(8px)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'background 0.3s ease',
          }} />

          {/* Animated SVG Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Globe Base */}
              <circle cx="50" cy="50" r="40" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
              {/* Grid Lines */}
              <path d="M50 10 C30 10, 10 30, 10 50 C10 70, 30 90, 50 90 C70 90, 90 70, 90 50 C90 30, 70 10, 50 10 Z" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M10 50 Q 50 20 90 50" stroke="#06b6d4" strokeWidth="1" fill="none" />
              <path d="M10 50 Q 50 80 90 50" stroke="#06b6d4" strokeWidth="1" fill="none" />
              <path d="M50 10 Q 20 50 50 90" stroke="#06b6d4" strokeWidth="1" fill="none" />
              <path d="M50 10 Q 80 50 50 90" stroke="#06b6d4" strokeWidth="1" fill="none" />
              
              {/* Animated Flight Path */}
              <path id="flightRoute" d="M20 70 C 10 30, 80 20, 85 40" stroke="url(#routeGrad)" strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
              <defs>
                <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Animated Airplane */}
              <g fill="#60a5fa">
                <path d="M-5,-4 L-3,-4 L0,-1.5 L4,-1.5 L7,-3 L8,-3 L5,0 L8,3 L7,3 L4,1.5 L0,1.5 L-3,4 L-5,4 L-3,0 Z" />
                <animateMotion 
                  dur="4s" 
                  repeatCount="indefinite" 
                  rotate="auto"
                  path="M20 70 C 10 30, 80 20, 85 40"
                />
              </g>
            </svg>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                fontFamily: 'Space Grotesk, sans-serif', 
                fontSize: '22px', 
                fontWeight: 800, 
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-0.03em'
              }}>
                ProFinFly <span style={{ color: '#06b6d4' }}>AI</span>
              </span>
              <span style={{
                fontSize: '10px',
                color: '#94a3b8',
                fontWeight: 500,
                letterSpacing: '0.05em',
                marginTop: '2px'
              }}>
                INTELLIGENCE PLATFORM
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: 2,
          flex: 1, justifyContent: 'center',
        }} className="desktop-nav">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#f0f4ff' : '#94a3b8',
                  background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.target.style.color = '#f0f4ff';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.target.style.color = '#94a3b8';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Search */}
          <motion.div
            animate={{ width: searchFocused ? 220 : 180 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${searchFocused ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 10,
              padding: '7px 12px',
              cursor: 'text',
            }}
            className="search-container"
          >
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search country, commodity..."
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: '#f0f4ff', fontSize: '0.8rem',
                fontFamily: 'Inter, sans-serif',
                width: '100%',
                '::placeholder': { color: '#475569' },
              }}
            />
          </motion.div>

          {/* Login */}
          <Link to="/login">
            <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
              <User size={14} />
              Login
            </button>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
              padding: 8, cursor: 'pointer', color: '#f0f4ff',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 999,
              background: 'rgba(5, 8, 22, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 24px 24px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={link.path}
                  style={{
                    display: 'block', padding: '12px 0',
                    fontSize: '1rem', fontWeight: 500,
                    color: location.pathname === link.path ? '#3b82f6' : '#94a3b8',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .search-container { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
