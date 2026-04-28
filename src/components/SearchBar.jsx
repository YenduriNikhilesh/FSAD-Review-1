import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

const G = '#fbbf24', DI = 'rgba(253,230,138,0.45)'
const FONT_B = "'Lora', serif"

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{ marginBottom: 28, maxWidth: 680, margin: '0 auto 28px' }}>

      <div style={{ position: 'relative' }}>
        {/* Left icon */}
        <span style={{
          position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
          color: focused ? G : DI, display: 'flex', pointerEvents: 'none',
          transition: 'color 0.2s',
        }}>
          <Search size={18} />
        </span>

        <input
          type="text"
          placeholder="Search resources, documents, archives…"
          value={query}
          onChange={handleSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: '15px 20px 15px 50px',
            background: focused ? 'rgba(251,191,36,0.06)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${focused ? 'rgba(251,191,36,0.6)' : 'rgba(251,191,36,0.16)'}`,
            borderRadius: 14,
            color: '#fef3c7',
            fontFamily: FONT_B,
            fontSize: 15,
            outline: 'none',
            caretColor: G,
            transition: 'all 0.25s ease',
            boxShadow: focused ? '0 0 0 3px rgba(251,191,36,0.07)' : 'none',
          }}
        />

        {/* Right hint */}
        {query.length === 0 && (
          <span style={{
            position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
            fontFamily: FONT_B, fontSize: 11, color: 'rgba(251,191,36,0.25)',
            fontStyle: 'italic', pointerEvents: 'none',
          }}>
            press enter
          </span>
        )}
      </div>
    </motion.div>
  )
}