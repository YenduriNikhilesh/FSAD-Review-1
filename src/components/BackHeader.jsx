import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BackHeader({ title, icon = '📚' }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 px-4 mb-12 rounded-2xl overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 blur-xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-4 transition"
        >
          <ChevronLeft size={20} />
          Back
        </motion.button>

        <div className="flex items-center gap-4">
          <span className="text-5xl">{icon}</span>
          <h1 className="text-5xl font-bold text-white">{title}</h1>
        </div>
      </div>
    </motion.div>
  )
}
