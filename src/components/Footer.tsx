import { Link } from 'react-router-dom'
import '../styles/components/Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MazecraftMC Network</h3>
          <p>The community Minecraft survival experience. Join small but active community of players!</p>
          <div className="footer-socials">
            <a href="https://discord.com/invite/HrRdV5jmua" className="footer-social-icon" aria-label="Discord" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><use href="#icon-discord"></use></svg>
            </a>
            <a href="https://bsky.app/profile/mazecraftmc.bsky.social" className="footer-social-icon" aria-label="Bluesky" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><use href="#icon-bluesky"></use></svg>
            </a>
            <a href="https://www.youtube.com/@MazecraftNetwork" className="footer-social-icon" aria-label="YouTube" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><use href="#icon-youtube"></use></svg>
            </a>
            <a href="https://github.com/soon" className="footer-social-icon" aria-label="GitHub" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><use href="#icon-github"></use></svg>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/maps">Maps</Link></li>
            <li><Link to="/players">Players</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li><Link to="/docs">Documentation</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">EULA</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 - {currentYear} MazecraftMC Network. All rights reserved. Not affiliated with Mojang or Microsoft.</p>
      </div>
    </footer>
  )
}

export default Footer