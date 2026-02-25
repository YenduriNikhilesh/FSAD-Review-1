import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Explore', path: '/explore' },
    { label: 'Resources', path: '/resources' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full backdrop-blur-md bg-slate-900/50 border-b border-white/10 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/home')}
          className="text-2xl font-bold text-gradient"
        >
          VEDA
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(item.path)}
              className="text-slate-300 hover:text-emerald-400 transition font-medium"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Desktop Profile */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/profile')}
            className="text-2xl hover:scale-110 transition"
          >
            👤
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-slate-900/80 px-4 py-4 space-y-3"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ x: 10 }}
              onClick={() => {
                navigate(item.path)
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded transition"
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ x: 10 }}
            onClick={() => {
              navigate('/profile')
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded transition"
          >
            Profile
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  )
}
