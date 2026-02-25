import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categories = [
  {
    id: 1,
    name: 'Research',
    icon: '🔬',
    color: 'from-blue-500 to-cyan-500',
    path: '/research',
    count: '1,234 Resources'
  },
  {
    id: 2,
    name: 'Career Development',
    icon: '💼',
    color: 'from-purple-500 to-pink-500',
    path: '/career',
    count: '856 Resources'
  },
  {
    id: 3,
    name: 'Cultural Archives',
    icon: '🎭',
    color: 'from-orange-500 to-red-500',
    path: '/cultural',
    count: '2,341 Resources'
  },
  {
    id: 4,
    name: 'Legal & Standards',
    icon: '⚖️',
    color: 'from-green-500 to-emerald-500',
    path: '/legal',
    count: '567 Resources'
  }
]

export default function HomePage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              One Platform All Knowledge
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
              Access comprehensive resources across Research, Career Development, Cultural Archives, and Legal Standards. All in one place.
            </p>
            
            {/* Search Bar */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources, documents, archives..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-slate-400 transition"
                />
                <button className="absolute right-4 top-3.5 text-emerald-400">🔍</button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-12"
            >
              <div className="w-full h-64 md:h-96 bg-gradient-to-b from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="text-8xl mb-4">📚</div>
                  <p className="text-slate-300">Knowledge Hub Illustration</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-12">Explore Categories</h2>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(category.path)}
                  className="card-glass group overflow-hidden relative"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-emerald-400 font-semibold">{category.count}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
