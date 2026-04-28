import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SlidingBanner from '../components/SlidingBanner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { isLoggedIn } from '../utils/auth'

/* ── ALL ORIGINAL LOGIC UNTOUCHED ── */
const categories = [
  { id: 1, name: 'Research',          icon: '🔬', path: '/research', count: '1,234 Resources', accent: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.3)' },
  { id: 2, name: 'Career Development',icon: '💼', path: '/career',   count: '856 Resources',   accent: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.3)' },
  { id: 3, name: 'Cultural Archives', icon: '🎭', path: '/cultural', count: '2,341 Resources',  accent: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.3)' },
  { id: 4, name: 'Legal & Standards', icon: '⚖️', path: '/legal',   count: '567 Resources',   accent: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)'  },
]

const G = '#fbbf24', I = '#fef3c7', DI = 'rgba(253,230,138,0.55)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) { navigate('/login') }
  }, [navigate])
  /* ────────────────────────────────── */

  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', fontFamily: FONT_B }}>
      <Navbar />

      <main style={{ paddingTop: 88 }}>

        {/* ── HERO ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 60px' }}>
          <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} style={{ textAlign: 'center' }}>

            {/* Eyebrow */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: FONT_H, fontStyle: 'italic', fontSize: 15,
                color: G, letterSpacing: '0.12em', margin: '0 0 18px' }}>
              Welcome to the Library
            </motion.p>

            {/* Headline */}
            <h1 style={{ fontFamily: FONT_H, fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 700, color: I, margin: '0 0 20px', lineHeight: 1.12 }}>
              One Platform,{' '}
              <span style={{ color: G, fontStyle: 'italic' }}>All Knowledge</span>
            </h1>

            <div style={{ width: 60, height: 2, margin: '0 auto 22px',
              background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />

            <p style={{ fontFamily: FONT_B, fontSize: 17, color: DI,
              maxWidth: 600, margin: '0 auto 44px', lineHeight: 1.75 }}>
              Access comprehensive resources across Research, Career Development,
              Cultural Archives, and Legal Standards.
            </p>

            {/* Search */}
            <div style={{ maxWidth: 580, margin: '0 auto 52px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 18, top: '50%',
                transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
              <input type="text" placeholder="Search resources…"
                style={{
                  width: '100%', padding: '16px 20px 16px 52px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(251,191,36,0.2)',
                  borderRadius: 14, color: I, fontFamily: FONT_B,
                  fontSize: 15, outline: 'none', caretColor: G,
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(251,191,36,0.65)'; e.target.style.background = 'rgba(251,191,36,0.06)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(251,191,36,0.2)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
              />
            </div>

            {/* Sliding Banner */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{ width: '100%', height: 300, borderRadius: 18,
                border: '1px solid rgba(251,191,36,0.15)',
                overflow: 'hidden' }}>
              <SlidingBanner />
            </motion.div>
          </motion.div>
        </section>

        {/* ── CATEGORIES ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
            <h2 style={{ fontFamily: FONT_H, fontSize: 32, fontWeight: 700, color: I, margin: 0 }}>
              Explore Categories
            </h2>
            <div style={{ flex: 1, height: 1, background: 'rgba(251,191,36,0.12)' }} />
          </div>

          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>

            {categories.map(cat => (
              <CategoryCard key={cat.id} cat={cat} navigate={navigate} />
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function CategoryCard({ cat, navigate }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.button
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
      whileHover={{ y: -8 }} whileTap={{ scale: 0.97 }}
      onClick={() => navigate(cat.path)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? cat.accent : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? cat.border : 'rgba(251,191,36,0.13)'}`,
        borderRadius: 18, padding: '30px 22px',
        cursor: 'pointer', textAlign: 'left',
        transition: 'all 0.3s ease',
        boxShadow: hov ? `0 12px 36px ${cat.accent}` : 'none',
        position: 'relative', overflow: 'hidden',
      }}>
      {/* Corner arc */}
      <div style={{
        position: 'absolute', top: -24, right: -24, width: 80, height: 80,
        borderRadius: '50%', border: `1px solid ${cat.border}`,
        opacity: hov ? 0.5 : 0.15, transition: 'opacity 0.3s',
      }} />
      <span style={{ fontSize: 44, display: 'block', marginBottom: 16, lineHeight: 1 }}>{cat.icon}</span>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
        color: '#fef3c7', margin: '0 0 8px', lineHeight: 1.3 }}>{cat.name}</h3>
      <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: '#fbbf24', margin: 0 }}>{cat.count}</p>
    </motion.button>
  )
}

import { useState } from 'react'