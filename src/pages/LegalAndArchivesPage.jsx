import { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader'
import SearchBar from '../components/SearchBar'
import CategoryTabs from '../components/CategoryTabs'
import { PageWrap, GridArea } from './_pageHelpers'

const TABS = ['All', 'Constitutional', 'Civil', 'Criminal', 'Corporate']

export default function LegalAndArchivesPage() {
  const [activeTab,   setActiveTab]   = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [resources,   setResources]   = useState([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError('')
      try {
        let url = 'http://localhost:8080/api/research/domain/legal'
        if (activeTab !== 'All') url += `/type/${activeTab.toLowerCase()}`
        const res  = await fetch(url)
        const data = await res.json()
        setResources(data)
      } catch { setError('Failed to load resources') }
      setLoading(false)
    }
    fetchData()
  }, [activeTab])

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageWrap>
      <BackHeader title="Legal & Standards" icon="⚖️" />
      <SearchBar onSearch={setSearchQuery} />
      <CategoryTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <GridArea items={filtered} loading={loading} error={error} cols={3} />
    </PageWrap>
  )
}