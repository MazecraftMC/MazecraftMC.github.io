import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastProvider } from './components/ToastContext'
import { ToastContainer } from './components/Toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Maps from './pages/Maps'
import Players from './pages/Players'
import Team from './pages/Team'
import Docs from './pages/Docs'

function AppContent() {
  const location = useLocation()
  const isDocsPage = location.pathname === '/docs'
  
  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  
  return (
    <div className={`app ${isDocsPage ? 'docs-route' : ''}`}>
      <ToastContainer />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/players" element={<Players />} />
          <Route path="/team" element={<Team />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  )
}

export default App