import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIChatWidget from './components/ai/AIChatWidget';
import StarField from './components/ui/StarField';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Countries = lazy(() => import('./pages/Countries'));
const TradeDashboard = lazy(() => import('./pages/TradeDashboard'));
const TradeAgreements = lazy(() => import('./pages/TradeAgreements'));
const Currency = lazy(() => import('./pages/Currency'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));

const LoadingSpinner = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '60vh', flexDirection: 'column', gap: '16px'
  }}>
    <div style={{
      width: 48, height: 48, border: '3px solid rgba(59,130,246,0.2)',
      borderTop: '3px solid #3b82f6', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <p style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>Loading...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <StarField />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/dashboard" element={<TradeDashboard />} />
            <Route path="/agreements" element={<TradeAgreements />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <AIChatWidget />
    </BrowserRouter>
  );
}

export default App;
