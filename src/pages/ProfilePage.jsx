import { motion } from 'framer-motion'
import { LogOut, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const G = '#fbbf24', I = '#fef3c7', DI = 'rgba(253,230,138,0.55)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

/* ── ALL ORIGINAL LOGIC UNTOUCHED ── */
export default function ProfilePage() {
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const savedResources = [
    { id: 1, title: 'Quantum Computing Basics', type: 'Research Paper', date: '2024-01-15' },
    { id: 2, title: 'AI Career Path',           type: 'Guide',          date: '2024-01-10' },
    { id: 3, title: 'Traditional Art Forms',    type: 'Archive',        date: '2024-01-05' },
  ]
  /* ────────────────────────────────── */

  const card = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(251,191,36,0.14)', borderRadius: 18 }

  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', fontFamily: FONT_B }}>
      <Navbar />

      <main style={{ maxWidth: 780, margin: '0 auto', padding: '96px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* ── Profile card ── */}
          <div style={{ ...card, padding: '48px 40px', marginBottom: 24 }}>

            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <motion.div whileHover={{ scale: 1.04 }}
                style={{
                  width: 110, height: 110, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, rgba(217,119,6,0.4), rgba(251,191,36,0.2))',
                  border: `2px solid rgba(251,191,36,0.4)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 48, boxShadow: '0 0 32px rgba(251,191,36,0.15)',
                }}>
                👤
              </motion.div>

              <h1 style={{ fontFamily: FONT_H, fontSize: 28, fontWeight: 700, color: I, margin: '0 0 6px' }}>
                {user.fullName || 'User Name'}
              </h1>
              <p style={{ fontFamily: FONT_B, fontStyle: 'italic', fontSize: 14, color: DI, margin: '0 0 22px' }}>
                {user.email || 'user@example.com'}
              </p>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 28px',
                  background: 'rgba(251,191,36,0.1)',
                  border: '1px solid rgba(251,191,36,0.35)',
                  borderRadius: 10, cursor: 'pointer',
                  fontFamily: FONT_B, fontSize: 14, color: G,
                }}>
                Edit Profile
              </motion.button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(251,191,36,0.1)', margin: '0 0 32px' }} />

            {/* Saved Resources */}
            <h2 style={{ fontFamily: FONT_H, fontSize: 22, fontWeight: 600, color: I, margin: '0 0 20px' }}>
              Saved Resources
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {savedResources.map((r, i) => (
                <motion.div key={r.id}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(251,191,36,0.1)',
                    borderRadius: 12, padding: '16px 20px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                  <div>
                    <p style={{ fontFamily: FONT_H, fontSize: 15, color: I, margin: '0 0 4px', fontWeight: 600 }}>
                      {r.title}
                    </p>
                    <p style={{ fontFamily: FONT_B, fontSize: 12.5, color: G, margin: '0 0 2px' }}>{r.type}</p>
                    <p style={{ fontFamily: FONT_B, fontSize: 11.5, color: 'rgba(253,230,138,0.35)', margin: 0 }}>{r.date}</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.15 }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: G }}>
                    <Download size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Logout */}
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '11px 28px',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 10, cursor: 'pointer',
                  fontFamily: FONT_B, fontSize: 14, color: '#f87171',
                }}>
                <LogOut size={16} /> Sign out of library
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}