import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProfilePage() {
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const savedResources = [
    { id: 1, title: 'Quantum Computing Basics', type: 'Research Paper', date: '2024-01-15' },
    { id: 2, title: 'AI Career Path', type: 'Guide', date: '2024-01-10' },
    { id: 3, title: 'Traditional Art Forms', type: 'Archive', date: '2024-01-05' },
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-glass max-w-2xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full bg-gradient-emerald flex items-center justify-center mb-6"
              >
                <span className="text-5xl">👤</span>
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">{user.fullName || 'User Name'}</h1>
              <p className="text-slate-300 mb-6">{user.email || 'user@example.com'}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Edit Profile
              </motion.button>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-8"></div>

            {/* Saved Resources */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Saved Resources</h2>
              <div className="space-y-4">
                {savedResources.map((resource, idx) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-white">{resource.title}</p>
                        <p className="text-sm text-emerald-400">{resource.type}</p>
                        <p className="text-xs text-slate-400 mt-1">{resource.date}</p>
                      </div>
                      <button className="text-emerald-400 hover:text-emerald-300">📥</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-12 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-3 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/30 transition"
              >
                <LogOut size={20} />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
