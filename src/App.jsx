import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import { isLoggedIn } from './utils/auth'

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route path="/research" element={
          <ProtectedRoute>
            <ResearchCategoryPage />
          </ProtectedRoute>
        } />

        <Route path="/career" element={
          <ProtectedRoute>
            <CareerDevelopmentPage />
          </ProtectedRoute>
        } />

        <Route path="/cultural" element={
          <ProtectedRoute>
            <CulturalArchivesPage />
          </ProtectedRoute>
        } />

        <Route path="/legal" element={
          <ProtectedRoute>
            <LegalAndArchivesPage />
          </ProtectedRoute>
        } />

        <Route path="/explore" element={
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        } />

        <Route path="/resources" element={
          <ProtectedRoute>
            <ResourcesPage />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  )
}

export default App
