/* _pageHelpers.jsx  –  internal helpers, not a page itself
   Import PageWrap and GridArea into each category page        */
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ResourceCard from '../components/ResourceCard'

const G = '#fbbf24', DI = 'rgba(253,230,138,0.45)'

export function PageWrap({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', fontFamily: "'Lora', serif" }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px 80px' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export function GridArea({ items, loading, error, cols = 3 }) {
  if (loading) return (
    <p style={{ textAlign: 'center', padding: '64px 0', fontFamily: "'Lora', serif",
      fontStyle: 'italic', color: DI, fontSize: 15 }}>
      Searching the stacks…
    </p>
  )
  if (error) return (
    <p style={{ textAlign: 'center', color: '#fca5a5', padding: '40px 0',
      fontFamily: "'Lora', serif" }}>{error}</p>
  )
  if (!items.length) return (
    <p style={{ textAlign: 'center', padding: '64px 0', fontFamily: "'Lora', serif",
      fontStyle: 'italic', color: DI, fontSize: 15 }}>
      No resources found.
    </p>
  )
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 20 }}>
      {items.map(item => <ResourceCard key={item.id} {...item} />)}
    </motion.div>
  )
}