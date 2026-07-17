import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, MessageSquare } from 'lucide-react';

const INITIAL_MSG = {
  id: 'init',
  role: 'assistant',
  content: `**Hi, I'm Nancy, your Global Trade Intelligence Analyst** 🤖\n\nI can help you analyze:\n- Bilateral trade relationships & corridors\n- Import/export statistics & market shares\n- Active & negotiating trade treaties (FTAs, CEPAs)\n- Currency impacts & macroeconomic risks\n- Supply chain shifts & trade commodity flows\n\nWhat global trade questions can I answer for you today?`,
  timestamp: new Date(),
};

const NANCY_SUGGESTIONS = [
  "Explain India-China trade",
  "Top export countries",
  "Current USD to INR",
  "Trade opportunities",
  "Market risk",
  "Commodity trends",
  "Trade agreements"
];

function getMockResponse(question) {
  const q = question.toLowerCase();
  if (q.includes('china')) {
    return `**India-China Bilateral Trade Analysis** 🇨🇳🇮🇳\n\n- **Bilateral Trade Volume**: ~$118B (FY2024)\n- **India's Imports from China**: ~$101B (mainly electronics, APIs, active solar cells, machinery)\n- **India's Exports to China**: ~$17B (mainly iron ore, cotton, organic chemicals)\n- **Trade Deficit**: ~$84B\n\n**AI Risk/Opportunity Insight**:\nThe persistent trade deficit has driven the Indian government to expand PLI (Production Linked Incentive) schemes to localize electronics component and API manufacturing, reducing import reliance over time.`;
  }
  if (q.includes('export')) {
    return `**Top Exporting Economies (2024)** 🌍\n\n1. **China**: $3.38T (Electronics, solar, EV batteries)\n2. **United States**: $2.06T (Machinery, refined oil, aircraft)\n3. **Germany**: $1.68T (Automotive, pharma, machinery)\n4. **Japan**: $750B (Automotive, industrial robotics)\n5. **South Korea**: $730B (Semiconductors, ships)\n\n*Source: World Trade Organization Database (WTO)*`;
  }
  if (q.includes('usd') || q.includes('rate') || q.includes('inr')) {
    return `**USD to INR Exchange Rate & Trade Impact** 💱\n\n- **Current Exchange Rate**: ~83.42 INR\n- **Trend**: Strengthening USD due to elevated Federal Reserve interest rates.\n\n**Bilateral Impact**:\n- **Exporters**: Indian software services, pharmaceuticals, and textile exporters benefit from a stronger dollar due to higher realizations in INR terms.\n- **Importers**: Crude oil, gas, coal, and defense imports become costlier, expanding the trade deficit.`;
  }
  if (q.includes('agreement') || q.includes('fta')) {
    return `**India's Key Active Trade Agreements** 🤝\n\n- **India-UAE CEPA (2022)**: Duty-free access to 90% of trade, resulting in record-high bilateral volumes.\n- **India-Australia ECTA (2022)**: Eliminated tariffs on 96% of Indian exports (textiles, agriculture) and critical mineral imports.\n- **India-Japan CEPA (2011)**: Deepened semiconductor and electronics supply chains.\n\n*In Negotiation*: India-UK FTA, India-EU FTA.`;
  }
  if (q.includes('opportunity') || q.includes('opportunities')) {
    return `**AI-Identified Global Trade Opportunities** 🚀\n\n1. **Electronics Nearshoring**: Supply chain diversification benefits Vietnam, Mexico, and India (especially in mobile assembling and component packaging).\n2. **Critical Minerals**: Australia and Canada trade corridors offer key lithium/cobalt imports for green battery supply chains.\n3. **Green Energy Hubs**: Expanding hydrogen and solar infrastructure in the Middle East offers technology integration potential.`;
  }
  if (q.includes('risk')) {
    return `**Global Trade Macroeconomic Risks** ⚠️\n\n- **Geopolitical Corridors**: Red Sea logistics bottlenecks raise shipping freight rates by 14-18%.\n- **Currency Fluctuations**: Emerging market capital outflows due to high dollar yields.\n- **Trade Restrictions**: Carbon border adjustment taxes (CBAM) set by the EU will affect steel and cement exports.`;
  }
  return `**Nancy Analyst Response** 🤖\n\nThat is a key trade intelligence vector. To analyze this commodity, market, or corridor in detail:\n- Navigating to the **Trade Dashboard** gives you historical trend charts.\n- Checking the **Currency** module displays real-time exchange rates.\n\n*Connect the live enterprise AI backend to query this exact intelligence point in real-time.*`;
}

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(6,182,212,0.15);padding:2px 5px;border-radius:4px;font-size:0.85em;color:#67e8f9">$1</code>')
    .replace(/^- (.*)/gm, '<li style="margin:4px 0;padding-left:6px">• $1</li>')
    .replace(/\n/g, '<br/>');
}

export default function AIChatWidget({ forceOpen = false, onClose }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isWidgetOpen = forceOpen || open;

  useEffect(() => {
    if (isWidgetOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      inputRef.current?.focus();
    }
  }, [isWidgetOpen, messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages(prev => [...prev, {
      id: Date.now(), role: 'user', content: msg, timestamp: new Date()
    }]);
    setInput('');
    setLoading(true);

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 600));

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'assistant',
      content: getMockResponse(msg),
      timestamp: new Date(),
    }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Sleek Floating Avatar Pill */}
      <motion.button
        initial={{ scale: 0, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 900,
          display: isWidgetOpen ? 'none' : 'flex', alignItems: 'center', gap: 10,
          padding: '12px 20px', borderRadius: 100,
          background: 'linear-gradient(135deg, #101827, #070b15)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 15px rgba(59,130,246,0.15)',
          color: '#f0f4ff', fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600, fontSize: '0.85rem'
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>🤖</span>
        <span>Nancy</span>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
        <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 400 }}>Ask Nancy...</span>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isWidgetOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 950,
              width: 390, height: 560,
              background: 'rgba(6, 10, 22, 0.96)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: 24,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 0 40px rgba(6,182,212,0.1)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(6, 182, 212, 0.05)',
            }}>
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                🤖
              </div>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#f0f4ff' }}>
                  Nancy AI Assistant
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulseGlow 1.5s ease-in-out infinite' }} />
                  <span style={{ fontSize: '0.72rem', color: '#6ee7b7', fontWeight: 600 }}>Enterprise Trade Analyst</span>
                </div>
              </div>
              <button
                onClick={() => { if (onClose) onClose(); else setOpen(false); }}
                style={{
                  marginLeft: 'auto', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10,
                  padding: 6, cursor: 'pointer', color: '#64748b', display: 'flex',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    gap: 10,
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #3b82f6, #06b6d4)'
                      : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem'
                  }}>
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </div>

                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))'
                      : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    fontSize: '0.82rem',
                    color: '#e2e8f0',
                    lineHeight: 1.6,
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                    🤖
                  </div>
                  <div style={{
                    padding: '12px 18px', borderRadius: '4px 18px 18px 18px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', gap: 5, alignItems: 'center',
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4' }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div style={{
              padding: '8px 16px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              overflowX: 'auto',
              display: 'flex', gap: 6, whiteSpace: 'nowrap',
            }}>
              {NANCY_SUGGESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '5px 12px',
                    background: 'rgba(6,182,212,0.08)',
                    border: '1px solid rgba(6,182,212,0.2)',
                    borderRadius: 100, color: '#67e8f9',
                    fontSize: '0.68rem', fontWeight: 600,
                    cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(6,182,212,0.15)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(6,182,212,0.08)'}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* User Input Bar */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: 8,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nancy about global trade, market potential, risks..."
                disabled={loading}
                style={{
                  flex: 1, padding: '11px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, color: '#f0f4ff',
                  fontSize: '0.82rem', fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{
                  width: 40, height: 40, borderRadius: 14,
                  background: input.trim() ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : 'rgba(255,255,255,0.04)',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease', flexShrink: 0,
                }}
              >
                <Send size={16} color={input.trim() ? 'white' : '#475569'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
