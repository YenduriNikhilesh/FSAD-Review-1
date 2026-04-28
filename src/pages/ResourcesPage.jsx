import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { deleteResource, getUserResources } from "../services/researchService"

const G = '#fbbf24', I = '#fef3c7', DI = 'rgba(253,230,138,0.5)'
const FONT_H = "'Playfair Display', serif", FONT_B = "'Lora', serif"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [resources,   setResources]   = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  /* ── ALL ORIGINAL LOGIC UNTOUCHED ── */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); setError(null)
        const res = await getUserResources()
        setResources(res.data)
      } catch (err) {
        console.error(err); setError("Failed to load resources")
      } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const filteredResources = resources.filter(r =>
    (r.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePreview  = (r) => { r.previewUrl ? window.open(r.previewUrl, "_blank") : alert("Preview not available") }
  const handleDownload = (r) => { r.fileUrl    ? window.open(r.fileUrl,    "_blank") : alert("File not available") }
  const handleDelete   = async (id) => {
    try { await deleteResource(id); setResources(prev => prev.filter(i => i.id !== id)) }
    catch (err) { console.error(err) }
  }
  /* ────────────────────────────────── */

  const rowV = {
    hidden:  { opacity: 0, x: -16 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
  }

  const thStyle = {
    textAlign: 'left', padding: '14px 20px',
    fontFamily: FONT_B, fontSize: 12.5, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(253,230,138,0.45)',
    fontWeight: 500, borderBottom: '1px solid rgba(251,191,36,0.1)',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', fontFamily: FONT_B }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px 80px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          style={{ marginBottom: 36 }}>
          <p style={{ fontFamily: FONT_H, fontStyle: 'italic', fontSize: 13, color: G,
            letterSpacing: '0.14em', margin: '0 0 8px', textTransform: 'uppercase' }}>
            Your collection
          </p>
          <h1 style={{ fontFamily: FONT_H, fontSize: 38, fontWeight: 700, color: I, margin: '0 0 6px' }}>
            My Resources
          </h1>
          <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${G}, transparent)`, marginBottom: 12 }} />
          <p style={{ fontFamily: FONT_B, fontStyle: 'italic', fontSize: 14, color: DI, margin: 0 }}>
            Manage and download your saved resources
          </p>
        </motion.div>

        <SearchBar onSearch={setSearchQuery} />

        {/* States */}
        {loading && (
          <p style={{ textAlign: 'center', fontFamily: FONT_B, fontStyle: 'italic',
            color: DI, padding: '60px 0', fontSize: 15 }}>
            Searching the stacks…
          </p>
        )}
        {error && (
          <p style={{ textAlign: 'center', color: '#fca5a5', fontFamily: FONT_B, padding: '40px 0' }}>{error}</p>
        )}
        {!loading && resources.length === 0 && !error && (
          <p style={{ textAlign: 'center', fontFamily: FONT_B, fontStyle: 'italic',
            color: 'rgba(253,230,138,0.35)', padding: '60px 0', fontSize: 15 }}>
            No resources yet. Start downloading to see them here.
          </p>
        )}

        {/* Table */}
        {!loading && resources.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(251,191,36,0.12)',
              borderRadius: 18, overflow: 'hidden',
            }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(251,191,36,0.04)' }}>
                    {['Title', 'Type', 'Size', 'Date', 'Actions'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((r, i) => (
                    <motion.tr key={r.id} custom={i} variants={rowV} initial="hidden" animate="visible"
                      style={{ borderBottom: '1px solid rgba(251,191,36,0.06)', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>

                      <td style={{ padding: '16px 20px' }}>
                        <p style={{ fontFamily: FONT_H, fontSize: 15, color: I, margin: 0, fontWeight: 600 }}>
                          {r.title}
                        </p>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontFamily: FONT_B, fontSize: 13, color: G,
                          background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
                          padding: '2px 10px', borderRadius: 999 }}>
                          {r.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontFamily: FONT_B, fontSize: 13, color: DI }}>{r.size || '—'}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontFamily: FONT_B, fontSize: 13, color: DI }}>{r.date || '—'}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          {[
                            { icon: <Eye size={16} />,      fn: () => handlePreview(r),  c: 'rgba(96,165,250,0.8)'  },
                            { icon: <Download size={16} />, fn: () => handleDownload(r), c: G                        },
                            { icon: <Trash2 size={16} />,   fn: () => handleDelete(r.id),c: 'rgba(248,113,113,0.8)' },
                          ].map((btn, bi) => (
                            <motion.button key={bi} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                              onClick={btn.fn}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: btn.c, display: 'flex' }}>
                              {btn.icon}
                            </motion.button>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {!loading && resources.length > 0 && filteredResources.length === 0 && (
          <p style={{ textAlign: 'center', fontFamily: FONT_B, fontStyle: 'italic',
            color: DI, padding: '48px 0' }}>
            No resources match your search.
          </p>
        )}
      </main>

      <Footer />
    </div>
  )
}