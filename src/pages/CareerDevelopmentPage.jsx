import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackHeader from '../components/BackHeader'
import SearchBar from '../components/SearchBar'
import CategoryTabs from '../components/CategoryTabs'
import ResourceCard from '../components/ResourceCard'

const careerResources = [
  { id: 1, title: 'Resume Writing Guide', category: 'Basics', type: 'Free', icon: '📝' },
  { id: 2, title: 'Interview Preparation', category: 'Interview Skills', type: 'Free', icon: '🎤' },
  { id: 3, title: 'Leadership Development', category: 'Management', type: 'Premium', icon: '👔' },
  { id: 4, title: 'Career Transition Guide', category: 'Planning', type: 'Free', icon: '🚀' },
  { id: 5, title: 'Salary Negotiation Tactics', category: 'Finance', type: 'Premium', icon: '💰' },
  { id: 6, title: 'Professional Networking', category: 'Networking', type: 'Free', icon: '🤝' },
]

export default function CareerDevelopmentPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = ['All', 'Skills', 'Management', 'Interview']

  const filteredResources = careerResources.filter(resource => {
    const matchesTab = activeTab === 'All' || resource.category.includes(activeTab)
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

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
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        <BackHeader title="Career Development" icon="💼" />

        <SearchBar onSearch={setSearchQuery} />

        <CategoryTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
