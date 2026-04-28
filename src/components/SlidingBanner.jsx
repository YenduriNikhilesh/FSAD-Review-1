import { useEffect, useState } from "react"

/* ── ALL ORIGINAL LOGIC UNTOUCHED ── */
const slides = [
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
]

export default function SlidingBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])
  /* ────────────────────────────────── */

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 18, position: 'relative' }}>

      {/* Slide strip */}
      <div style={{
        display: 'flex', height: '100%',
        transform: `translateX(-${current * 100}%)`,
        transition: 'transform 0.75s cubic-bezier(0.77,0,0.18,1)',
      }}>
        {slides.map((img, i) => (
          <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
            <img src={img} alt="banner"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>

      {/* Layered overlays for literary feel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(6,13,26,0.55) 0%, rgba(6,13,26,0.1) 40%, rgba(6,13,26,0.55) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(6,13,26,0.7) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Caption area */}
      <div style={{
        position: 'absolute', bottom: 22, left: 28,
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic', fontSize: 15,
        color: 'rgba(253,230,138,0.7)',
        letterSpacing: '0.04em',
        textShadow: '0 1px 8px rgba(0,0,0,0.5)',
      }}>
        Explore the world's knowledge
      </div>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: 24, right: 28,
        display: 'flex', gap: 7,
      }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 18 : 6,
            height: 6, borderRadius: 999,
            background: i === current ? '#fbbf24' : 'rgba(255,255,255,0.3)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>

      {/* Golden frame border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 18,
        border: '1px solid rgba(251,191,36,0.25)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}