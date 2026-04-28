import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const G = '#fbbf24', I = '#fef3c7', DI = 'rgba(253,230,138,0.55)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

export default function BackHeader({ title, icon = '📚' }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      style={{ position: 'relative', marginBottom: 40, paddingBottom: 32 }}>

      {/* Ambient glow behind header */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 100% at 20% 50%, rgba(251,191,36,0.07) 0%, transparent 70%)',
      }} />

      {/* Back button */}
      <motion.button
        whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: FONT_B, fontStyle: 'italic', fontSize: 14, color: G,
          padding: 0,
        }}>
        <ChevronLeft size={17} strokeWidth={2} />
        Back to library
      </motion.button>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontSize: 48, lineHeight: 1 }}>
          {icon}
        </motion.span>
        <div>
          <h1 style={{
            fontFamily: FONT_H, fontSize: 40, fontWeight: 700,
            color: I, margin: 0, lineHeight: 1.15,
          }}>
            {title}
          </h1>
          <div style={{
            marginTop: 8, width: 48, height: 2,
            background: `linear-gradient(90deg, ${G}, transparent)`,
          }} />
        </div>
      </div>

      {/* Bottom separator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, rgba(251,191,36,0.25), rgba(251,191,36,0.06), transparent)',
      }} />

      {/* Corner ornament */}
      <svg style={{ position: 'absolute', top: 0, right: 0, opacity: 0.15 }}
        width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="72" cy="0" r="55" stroke={G} strokeWidth="0.7" fill="none" />
        <circle cx="72" cy="0" r="35" stroke={G} strokeWidth="0.5" fill="none" />
        <circle cx="72" cy="0" r="15" stroke={G} strokeWidth="0.5" fill="none" />
      </svg>
    </motion.div>
  )
}