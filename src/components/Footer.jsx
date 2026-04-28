import { motion } from 'framer-motion'

const G = '#fbbf24', DI = 'rgba(253,230,138,0.45)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

const links = {
  Categories: [
    { label: 'Research',  href: '/research' },
    { label: 'Career',    href: '/career' },
    { label: 'Cultural',  href: '/cultural' },
    { label: 'Legal',     href: '/legal' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'FAQ',           href: '#' },
    { label: 'Support',       href: '#' },
    { label: 'Contact',       href: '#' },
  ],
  Legal: [
    { label: 'Privacy',  href: '#' },
    { label: 'Terms',    href: '#' },
    { label: 'Cookies',  href: '#' },
    { label: 'Sitemap',  href: '#' },
  ],
}

function ColTitle({ children }) {
  return (
    <p style={{ fontFamily: FONT_H, fontSize: 15, fontWeight: 600,
      color: '#fef3c7', margin: '0 0 16px', letterSpacing: '0.03em' }}>
      {children}
    </p>
  )
}

function FootLink({ href, children }) {
  const [h, setH] = useState(false)
  return (
    <li style={{ listStyle: 'none', marginBottom: 10 }}>
      <a href={href}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ fontFamily: FONT_B, fontSize: 13.5, color: h ? G : DI,
          textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex',
          alignItems: 'center', gap: 6 }}>
        {h && <span style={{ fontSize: 10, color: G }}>→</span>}
        {children}
      </a>
    </li>
  )
}

import { useState } from 'react'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      style={{
        marginTop: 80,
        background: 'rgba(6,10,20,0.95)',
        borderTop: '1px solid rgba(251,191,36,0.12)',
        backdropFilter: 'blur(12px)',
        fontFamily: FONT_B,
      }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily: FONT_H, fontSize: 26, fontWeight: 700,
              color: G, margin: '0 0 12px', letterSpacing: '0.06em' }}>
              VEDA
            </p>
            <div style={{ width: 32, height: 1.5, background: `linear-gradient(90deg,${G},transparent)`, marginBottom: 14 }} />
            <p style={{ fontFamily: FONT_B, fontStyle: 'italic', fontSize: 13.5, color: DI, margin: 0, lineHeight: 1.7 }}>
              One Platform,<br />All Knowledge.
            </p>
          </div>

          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <ColTitle>{col}</ColTitle>
              <ul style={{ margin: 0, padding: 0 }}>
                {items.map(l => <FootLink key={l.label} href={l.href}>{l.label}</FootLink>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(251,191,36,0.08)',
          padding: '20px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontFamily: FONT_B, fontSize: 12, color: 'rgba(253,230,138,0.28)', margin: 0 }}>
            © 2025 VEDA Educational Library · All rights reserved
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: '50%',
                background: i === 2 ? G : 'rgba(251,191,36,0.2)' }} />
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}