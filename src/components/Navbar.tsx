import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/components/Navbar.css'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/resources/images/mazecraft.png" alt="Mazecraft Logo" />
        </Link>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/maps" className={location.pathname === '/maps' ? 'active' : ''} onClick={closeMenu}>Maps</Link></li>
          <li><Link to="/players" className={location.pathname === '/players' ? 'active' : ''} onClick={closeMenu}>Players</Link></li>
          <li><Link to="/team" className={location.pathname === '/team' ? 'active' : ''} onClick={closeMenu}>Team</Link></li>
          <li><Link to="/docs" className={location.pathname === '/docs' ? 'active' : ''} onClick={closeMenu}>Docs</Link></li>
        </ul>

        <button className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar