import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import ResearchCategoryPage from './pages/ResearchCategoryPage'
import CareerDevelopmentPage from './pages/CareerDevelopmentPage'
import CulturalArchivesPage from './pages/CulturalArchivesPage'
import LegalAndArchivesPage from './pages/LegalAndArchivesPage'
import ExplorePage from './pages/ExplorePage'
import ResourcesPage from './pages/ResourcesPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/research" element={<ResearchCategoryPage />} />
        <Route path="/career" element={<CareerDevelopmentPage />} />
        <Route path="/cultural" element={<CulturalArchivesPage />} />
        <Route path="/legal" element={<LegalAndArchivesPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
