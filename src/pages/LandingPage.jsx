import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const G = '#fbbf24', DI = 'rgba(253,230,138,0.45)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

/* ── ALL ORIGINAL LOGIC UNTOUCHED ── */
export default function LandingPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let value = 0
    const interval = setInterval(() => {
      value += 2
      setProgress(value)
      if (value >= 100) {
        clearInterval(interval)
        setTimeout(() => { navigate("/login") }, 500)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [navigate])
  /* ────────────────────────────────── */

  return (
    <div style={{
      height: '100vh', width: '100%', background: '#060d1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_B, position: 'relative', overflow: 'hidden',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(251,191,36,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Radial warm glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,100,10,0.14) 0%, transparent 70%)',
      }} />

      {/* Concentric circles ornament */}
      <svg style={{ position: 'absolute', opacity: 0.07 }} width="600" height="600" viewBox="0 0 600 600">
        {[280, 220, 160, 100, 50].map((r, i) => (
          <circle key={i} cx="300" cy="300" r={r} stroke={G} strokeWidth="0.8" fill="none" />
        ))}
      </svg>

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Book icon */}
        <div style={{ fontSize: 52, marginBottom: 20, lineHeight: 1 }}>📖</div>

        {/* Logo */}
        <h1 style={{
          fontFamily: FONT_H, fontSize: 56, fontWeight: 700, color: G,
          margin: '0 0 8px', letterSpacing: '0.08em', lineHeight: 1,
        }}>
          VEDA
        </h1>

        <div style={{
          width: 48, height: 1.5, margin: '0 auto 14px',
          background: `linear-gradient(90deg, transparent, ${G}, transparent)`,
        }} />

        <p style={{
          fontFamily: FONT_B, fontStyle: 'italic', fontSize: 15,
          color: DI, margin: '0 0 52px', letterSpacing: '0.06em',
        }}>
          Your Digital Library of Knowledge
        </p>

        {/* Progress track */}
        <div style={{ width: 240, margin: '0 auto' }}>
          <div style={{
            height: 2, width: '100%', borderRadius: 999,
            background: 'rgba(251,191,36,0.12)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 999,
              width: `${progress}%`,
              background: `linear-gradient(90deg, rgba(217,119,6,0.8), ${G})`,
              transition: 'width 0.15s linear',
              boxShadow: `0 0 8px rgba(251,191,36,0.4)`,
            }} />
          </div>

          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: FONT_B, fontStyle: 'italic', fontSize: 12.5, color: DI, margin: 0 }}>
              Preparing the stacks…
            </p>
            <p style={{ fontFamily: FONT_H, fontSize: 14, color: G, margin: 0, fontWeight: 600 }}>
              {progress}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}