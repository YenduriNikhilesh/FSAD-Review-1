import { useState, useEffect } from 'react'
import BackHeader from '../components/BackHeader'
import SearchBar from '../components/SearchBar'
import CategoryTabs from '../components/CategoryTabs'
import { getByDomainAndType } from '../services/researchService'
import { PageWrap, GridArea } from './_pageHelpers'

const TABS    = ['All', 'Subjects', 'Journals', 'Institutions']
const TYPEMAP = { Subjects: 'subject', Journals: 'journal', Institutions: 'institution' }

export default function ResearchCategoryPage() {
  const [activeTab,   setActiveTab]   = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [resources,   setResources]   = useState([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError('')
      try {
        const type = activeTab === 'All' ? 'all' : TYPEMAP[activeTab]
        const res  = await getByDomainAndType('research', type)
        setResources(res.data)
      } catch (err) { console.error(err); setError('Failed to load resources') }
      setLoading(false)
    }
    fetchData()
  }, [activeTab])

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageWrap>
      <BackHeader title="Research" icon="🔬" />
      <SearchBar onSearch={setSearchQuery} />
      <CategoryTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <GridArea items={filtered} loading={loading} error={error} cols={3} />
    </PageWrap>
  )
}