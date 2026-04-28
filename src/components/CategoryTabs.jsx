import { motion } from 'framer-motion'
import { useState } from 'react'

const G = '#fbbf24', DI = 'rgba(253,230,138,0.5)'
const FONT_B = "'Lora', serif"

export default function CategoryTabs({ tabs, activeTab, onTabChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>

      {tabs.map((tab, idx) => {
        const active = tab === activeTab
        return (
          <Tab key={tab} tab={tab} active={active} idx={idx} onTabChange={onTabChange} />
        )
      })}
    </motion.div>
  )
}

function Tab({ tab, active, idx, onTabChange }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.button
      custom={idx}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onTabChange(tab)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '9px 22px',
        background: active
          ? 'rgba(251,191,36,0.15)'
          : hov ? 'rgba(251,191,36,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${active ? G : 'rgba(251,191,36,0.18)'}`,
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: FONT_B,
        fontSize: 13.5,
        fontWeight: active ? 500 : 400,
        color: active ? G : hov ? 'rgba(253,230,138,0.75)' : DI,
        letterSpacing: '0.03em',
        transition: 'all 0.22s ease',
        boxShadow: active ? '0 2px 12px rgba(251,191,36,0.15)' : 'none',
        position: 'relative',
      }}>
      {active && (
        <motion.span
          layoutId="tab-dot"
          style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            width: 5, height: 5, borderRadius: '50%', background: G,
          }} />
      )}
      <span style={{ marginLeft: active ? 8 : 0 }}>{tab}</span>
    </motion.button>
  )
}