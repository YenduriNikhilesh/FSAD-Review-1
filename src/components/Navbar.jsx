import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

/* Inject fonts once globally */
const injectFonts = () => {
  if (document.getElementById('veda-gfonts')) return
  const l = document.createElement('link')
  l.id = 'veda-gfonts'; l.rel = 'stylesheet'
  l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap'
  document.head.appendChild(l)
  /* Global body reset */
  const s = document.createElement('style')
  s.id = 'veda-globals'
  s.textContent = `* { box-sizing: border-box; } body { margin: 0; background: #060d1a; font-family: 'Lora', serif; }`
  document.head.appendChild(s)
}

const G = '#fbbf24', I = '#fef3c7', DI = 'rgba(253,230,138,0.55)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { injectFonts() }, [])

  const navItems = [
    { label: 'Explore', path: '/explore' },
    { label: 'Resources', path: '/resources' },
  ]

  const navStyle = {
    position: 'fixed', top: 0, width: '100%', zIndex: 999,
    background: 'rgba(6,13,26,0.85)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(251,191,36,0.15)',
    fontFamily: FONT_B,
  }
  const innerStyle = {
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }
  const linkStyle = (hover) => ({
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: FONT_B, fontSize: 14.5, letterSpacing: '0.04em',
    color: hover ? G : DI, transition: 'color 0.2s', padding: '6px 0',
  })

  return (
    <motion.nav style={navStyle}
      initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>

      {/* Fixed dot-grid bg behind entire app */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(251,191,36,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={innerStyle}>
        {/* Logo */}
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: FONT_H, fontSize: 24, fontWeight: 700, color: G, letterSpacing: '0.06em' }}>
          VEDA
        </motion.button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {navItems.map(item => (
            <NavBtn key={item.path} label={item.label} onClick={() => navigate(item.path)} />
          ))}
          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'rgba(251,191,36,0.2)' }} />
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate('/profile')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
            👤
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: G,
            '@media (max-width: 768px)': { display: 'flex' } }}
          className="md:hidden">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(6,13,26,0.96)', borderTop: '1px solid rgba(251,191,36,0.1)', padding: '12px 24px 20px' }}>
            {[...navItems, { label: 'Profile', path: '/profile' }].map(item => (
              <motion.button key={item.path} whileHover={{ x: 8 }}
                onClick={() => { navigate(item.path); setIsOpen(false) }}
                style={{ display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: FONT_B, fontSize: 15, color: DI, padding: '12px 0',
                  borderBottom: '1px solid rgba(251,191,36,0.06)' }}>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavBtn({ label, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.button whileHover={{ y: -1 }} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Lora', serif", fontSize: 14.5, letterSpacing: '0.04em',
        color: hov ? '#fbbf24' : 'rgba(253,230,138,0.55)', transition: 'color 0.2s' }}>
      {label}
    </motion.button>
  )
}