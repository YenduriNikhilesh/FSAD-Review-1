import { motion } from 'framer-motion'

export default function ResourceCard({ title, category, type, icon = '📄' }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card-glass group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
          {type}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-emerald-300 transition">
        {title}
      </h3>
      
      <p className="text-sm text-slate-400 mb-4">{category}</p>
      
      <div className="flex gap-2 pt-4 border-t border-white/10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2 text-sm bg-emerald-500/20 text-emerald-300 rounded hover:bg-emerald-500/30 transition"
        >
          Preview
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2 text-sm bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition"
        >
          Download
        </motion.button>
      </div>
    </motion.div>
  )
}
