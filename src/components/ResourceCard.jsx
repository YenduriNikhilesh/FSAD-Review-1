import { motion } from 'framer-motion'
import { Eye, Download } from 'lucide-react'
import { addResource } from "../services/researchService"

const G = '#fbbf24', I = '#fef3c7', DI = 'rgba(253,230,138,0.5)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

export default function ResourceCard({
  id,
  title,
  author = "System",
  category,
  type,
  icon = '📄',
  previewUrl,
  fileUrl
}) {
  /* ── ALL ORIGINAL LOGIC UNTOUCHED ── */
  const handleDownload = async (e) => {
    e.stopPropagation()
    try {
      const payload = { title, author, category, type, domain: "user", previewUrl, fileUrl }
      console.log("Sending:", payload)
      const res = await addResource(payload)
      console.log("Saved:", res.data)
      if (fileUrl) { window.open(fileUrl, "_blank") }
      else { alert("File not available") }
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message)
    }
  }

  const handlePreview = (e) => {
    e.stopPropagation()
    if (previewUrl) { window.open(previewUrl, '_blank') }
    else { alert('Preview not available') }
  }
  /* ────────────────────────────────── */

  return (
    <motion.div
      whileHover={{ y: -6, borderColor: G }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(251,191,36,0.14)',
        borderRadius: 16,
        padding: '22px 20px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 12,
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(251,191,36,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>

      {/* Subtle corner glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%', background: 'rgba(251,191,36,0.04)',
        pointerEvents: 'none',
      }} />

      {/* Icon + Type badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 36, lineHeight: 1 }}>{icon}</span>
        <span style={{
          fontFamily: FONT_B, fontSize: 11.5, letterSpacing: '0.06em',
          color: G, background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.25)',
          padding: '3px 12px', borderRadius: 999, textTransform: 'capitalize',
        }}>
          {type}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: FONT_H, fontSize: 17, fontWeight: 600,
        color: I, margin: 0, lineHeight: 1.4,
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {title}
      </h3>

      {/* Category */}
      <p style={{ fontFamily: FONT_B, fontSize: 13, color: DI, margin: 0 }}>
        {category}
      </p>

      {/* Action buttons */}
      <div style={{
        display: 'flex', gap: 10, marginTop: 'auto',
        paddingTop: 14, borderTop: '1px solid rgba(251,191,36,0.08)',
      }}>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={handlePreview}
          style={{
            flex: 1, padding: '9px 0',
            background: 'rgba(251,191,36,0.07)',
            border: '1px solid rgba(251,191,36,0.2)',
            borderRadius: 10, cursor: 'pointer',
            fontFamily: FONT_B, fontSize: 13, color: G,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background 0.2s',
          }}>
          <Eye size={14} /> Preview
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={handleDownload}
          style={{
            flex: 1, padding: '9px 0',
            background: 'linear-gradient(135deg, rgba(217,119,6,0.3), rgba(251,191,36,0.2))',
            border: '1px solid rgba(251,191,36,0.35)',
            borderRadius: 10, cursor: 'pointer',
            fontFamily: FONT_B, fontSize: 13, color: G,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background 0.2s',
          }}>
          <Download size={14} /> Download
        </motion.button>
      </div>
    </motion.div>
  )
}