import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CategoryTabs({ tabs, activeTab, onTabChange }) {
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap gap-3 mb-8"
    >
      {tabs.map((tab, idx) => (
        <motion.button
          key={tab}
          custom={idx}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === tab
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
          }`}
        >
          {tab}
        </motion.button>
      ))}
    </motion.div>
  )
}
