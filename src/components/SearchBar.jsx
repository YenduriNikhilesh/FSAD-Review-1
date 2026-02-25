import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="relative max-w-2xl mx-auto">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Search resources, documents, archives..."
          value={query}
          onChange={handleSearch}
          className="w-full px-6 py-4 pl-12 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-slate-400 transition"
        />
        <Search className="absolute left-4 top-4 text-slate-400" size={20} />
      </div>
    </motion.div>
  )
}
