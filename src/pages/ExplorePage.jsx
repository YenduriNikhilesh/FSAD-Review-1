import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackHeader from '../components/BackHeader'
import SearchBar from '../components/SearchBar'
import CategoryTabs from '../components/CategoryTabs'
import ResourceCard from '../components/ResourceCard'

const allResources = [
  { id: 1, title: 'Quantum Computing Fundamentals', category: 'Research', type: 'Free', icon: '⚛️' },
  { id: 2, title: 'Resume Writing Guide', category: 'Career', type: 'Free', icon: '📝' },
  { id: 3, title: 'Classical Indian Music History', category: 'Cultural', type: 'Free', icon: '🎵' },
  { id: 4, title: 'Constitutional Law Guide', category: 'Legal', type: 'Free', icon: '⚖️' },
  { id: 5, title: 'Advanced Neural Networks', category: 'Research', type: 'Free', icon: '🧠' },
  { id: 6, title: 'Interview Preparation', category: 'Career', type: 'Free', icon: '🎤' },
  { id: 7, title: 'Traditional Dance Forms', category: 'Cultural', type: 'Free', icon: '🎭' },
  { id: 8, title: 'Contract Drafting Standards', category: 'Legal', type: 'Premium', icon: '📜' },
  { id: 9, title: 'Molecular Biology Research', category: 'Research', type: 'Premium', icon: '🔬' },
  { id: 10, title: 'Leadership Development', category: 'Career', type: 'Premium', icon: '👔' },
  { id: 11, title: 'Ancient Sculpture Techniques', category: 'Cultural', type: 'Premium', icon: '🗿' },
  { id: 12, title: 'Criminal Code Archives', category: 'Legal', type: 'Free', icon: '🚨' },
]

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = ['All', 'Research', 'Career', 'Cultural', 'Legal']

  const filteredResources = allResources.filter(resource => {
    const matchesTab = activeTab === 'All' || resource.category === activeTab
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        <BackHeader title="Explore All Resources" icon="🌍" />

        <SearchBar onSearch={setSearchQuery} />

        <CategoryTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredResources.map((resource, idx) => (
            <motion.div key={resource.id} variants={itemVariants}>
              <ResourceCard {...resource} />
            </motion.div>
          ))}
        </motion.div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">No resources found matching your criteria.</p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
