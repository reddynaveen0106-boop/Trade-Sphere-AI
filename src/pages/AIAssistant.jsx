import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Zap, User } from 'lucide-react';
import { AI_QUICK_QUESTIONS, AI_MOCK_RESPONSES } from '../data/mockData';

const INITIAL_MESSAGES = [
  {
    id: 'init',
    role: 'assistant',
    content: `**Welcome to Trade Intelligence AI** 🌐\n\nI'm your AI-powered trade analyst. Ask me anything about:\n\n- 📊 Global trade statistics & bilateral data\n- 🤝 Trade agreements (FTAs, CEPAs, ECTAs)\n- 💱 Currency impacts on trade\n- 📦 HS codes & commodity classification\n- 🌍 Country-specific trade insights\n- 📈 Market opportunities & risks\n\nWhat would you like to explore today?`,
  },
];

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(59,130,246,0.12);padding:2px 6px;border-radius:4px;font-size:0.85em;font-family:monospace">$1</code>')
    .replace(/^- (.*)/gm, '<li style="margin:4px 0;padding-left:4px">• $1</li>')
    .replace(/^\| (.+) \|$/gm, (m) => {
      const cells = m.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td style="padding:6px 12px;border:1px solid rgba(255,255,255,0.06)">${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>)/gs, '<table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.8rem">$1</table>')
    .replace(/\n/g, '<br/>');
}

function getMockResponse(q) {
  const ql = q.toLowerCase();
  if (ql.includes('rice')) return AI_MOCK_RESPONSES.rice;
  return AI_MOCK_RESPONSES.default;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(p => [...p, { id: Date.now(), role: 'user', content: msg }]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
    setMessages(p => [...p, { id: Date.now() + 1, role: 'assistant', content: getMockResponse(msg) }]);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 32, paddingBottom: 32 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={26} color="white" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#f0f4ff', letterSpacing: '-0.02em' }}>
                AI Trade Assistant
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'pulseGlow 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '0.78rem', color: '#6ee7b7', fontWeight: 500 }}>Model ready · Powered by Trade Intelligence AI</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat area */}
        <div style={{
          flex: 1, background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i === messages.length - 1 ? 0 : 0 }}
                style={{ display: 'flex', gap: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', maxWidth: '85%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {msg.role === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="white" />}
                </div>
                <div style={{
                  padding: '14px 18px', borderRadius: msg.role === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.7,
                }}>
                  <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                </div>
              </motion.div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={16} color="white" />
                </div>
                <div style={{ padding: '14px 18px', borderRadius: '4px 20px 20px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, delay: i * 0.12, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#8b5cf6' }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', overflowX: 'auto', display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
            {AI_QUICK_QUESTIONS.map((q, i) => (
              <button key={i} onClick={() => send(q)} style={{
                padding: '6px 12px', borderRadius: 100, flexShrink: 0,
                background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)',
                color: '#93c5fd', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 10 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="Ask about trade agreements, import/export data, currencies..."
              disabled={loading}
              style={{
                flex: 1, padding: '13px 18px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, color: '#f0f4ff', fontSize: '0.88rem',
                fontFamily: 'Inter, sans-serif', outline: 'none',
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: input.trim() ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'rgba(255,255,255,0.04)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Send size={18} color={input.trim() ? 'white' : '#475569'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
