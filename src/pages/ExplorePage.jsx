import { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader'
import SearchBar from '../components/SearchBar'
import CategoryTabs from '../components/CategoryTabs'
import { PageWrap, GridArea } from './_pageHelpers'

const TABS = ['All', 'Research', 'Career', 'Cultural', 'Legal']

export default function ExplorePage() {
  const [activeTab,   setActiveTab]   = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [resources,   setResources]   = useState([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError('')
      try {
        const res  = await fetch('http://localhost:8080/api/research')
        const data = await res.json()
        setResources(data)
      } catch { setError('Failed to load resources') }
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = resources.filter(r => {
    const matchTab    = activeTab === 'All' || r.domain === activeTab.toLowerCase()
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <PageWrap>
      <BackHeader title="Explore All Resources" icon="🌍" />
      <SearchBar onSearch={setSearchQuery} />
      <CategoryTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <GridArea items={filtered} loading={loading} error={error} cols={4} />
    </PageWrap>
  )
}