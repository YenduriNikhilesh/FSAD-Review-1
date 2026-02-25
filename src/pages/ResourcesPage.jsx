import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

const resources = [
  { id: 1, title: 'Quantum Computing Fundamentals', type: 'Research Paper', date: '2024-01-20', size: '2.4 MB' },
  { id: 2, title: 'Resume Writing Guide', type: 'PDF Guide', date: '2024-01-15', size: '1.2 MB' },
  { id: 3, title: 'Classical Indian Music History', type: 'Archive', date: '2024-01-10', size: '5.6 MB' },
  { id: 4, title: 'Constitutional Law Guide', type: 'Document', date: '2024-01-05', size: '3.1 MB' },
  { id: 5, title: 'Advanced Neural Networks', type: 'Research Paper', date: '2023-12-28', size: '4.2 MB' },
  { id: 6, title: 'Interview Preparation', type: 'PDF Guide', date: '2023-12-20', size: '1.8 MB' },
  { id: 7, title: 'Traditional Dance Forms', type: 'Archive', date: '2023-12-15', size: '6.3 MB' },
  { id: 8, title: 'Contract Drafting Standards', type: 'Document', date: '2023-12-10', size: '2.9 MB' },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.4 }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">My Resources</h1>
          <p className="text-slate-300">Manage and download your saved resources</p>
        </motion.div>

        <SearchBar onSearch={setSearchQuery} />

        {/* Resources Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card-glass overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 font-semibold text-slate-300">Title</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-300">Type</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-300">Size</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-300">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, idx) => (
                  <motion.tr
                    key={resource.id}
                    custom={idx}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{resource.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-emerald-400">{resource.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{resource.size}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{resource.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          <Eye size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-emerald-400 hover:text-emerald-300 transition"
                        >
                          <Download size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">No resources found.</p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
