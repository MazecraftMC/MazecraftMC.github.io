import { useEffect, useState } from 'react'
import { useToast } from '../components/ToastContext'
import '../styles/pages/Home.css'

interface ServerStatus {
  online: boolean
  players?: {
    online: number
    max: number
  }
}

const Home = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({ online: false })
  const { showToast } = useToast()

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`https://api.mcsrvstat.us/3/play.mazecraftmc.fun`)
        const data = await response.json()
        setServerStatus(data)
      } catch (error) {
        console.error('Failed to fetch server status:', error)
        setServerStatus({ online: false })
      }
    }

    checkServerStatus()
    const interval = setInterval(checkServerStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText('play.mazecraftmc.fun')
      showToast('Server IP copied to clipboard!', 'success')
    } catch (error) {
      showToast('Failed to copy IP', 'error')
    }
  }



  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" aria-label="Hero Section">
        <div className="hero-background">
          <img src="/resources/images/test-bg2.webp" alt="Minecraft Background" loading="lazy" />
        </div>

        <div className="hero-content">
          <img src="/resources/images/mazecraft.png" alt="Mazecraft Logo" className="hero-logo" />
          <p className="hero-subtitle">The community Minecraft Survival Experience</p>

          <div className="hero-ip-box">
            <div className="hero-ip-address">
              <div className="hero-ip-content">
                <div
                  className={`status-indicator ${serverStatus.online ? 'online' : 'offline'}`}
                ></div>
                <span className="hero-ip-text">play.mazecraftmc.fun</span>
              </div>
              <button className="copy-btn" onClick={copyIP} aria-label="Copy Server IP">
                <svg viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
            </div>
            {serverStatus.online && (
              <div className="hero-player-count">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <span>{serverStatus.players?.online || 0} Online</span>
              </div>
            )}
          </div>

          <div className="hero-actions">
            <a href="#community" className="btn btn-discord">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
            <a href="#about" className="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section" aria-label="Features">
        <div className="container">
          <h2 className="section-title">Why Choose Mazecraft?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3>Mostly Vanilla</h3>
              <p>Vanilla Minecraft experience with quality-of-life improvements</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h3>Active Community</h3>
              <p>Join a small but active community of players and make new friends</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h3>24/7 Uptime</h3>
              <p>Servers based in India provide reliable 24/7 uptime</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              <h3>Regular Events</h3>
              <p>Weekly events, competitions, and exclusive rewards coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section section" aria-label="About Us">
        <div className="container">
          <h2 className="section-title">About Mazecraft</h2>

          {/* About Block 1 */}
          <div className="about-block">
            <div className="about-text">
              <h2>Mostly Vanilla Survival</h2>
              <p>Experience Minecraft the way it was meant to be played. Our server offers a mostly vanilla survival experience with carefully selected enhancements that improve gameplay without compromising the core Minecraft feel.</p>
              <p>Build, explore, and thrive in a friendly community where creativity meets adventure. Join thousands of players who have made Mazecraft their home!</p>
            </div>
            <div className="about-image">
              <img src="/resources/images/mostly-vanilla.webp" alt="Minecraft Gameplay" loading="lazy" />
            </div>
          </div>

          {/* About Block 2 */}
          <div className="about-block reverse">
            <div className="about-text">
              <h2>Coming Soon</h2>
              <p>Working on a new gamemode, join our community discord to find out more!</p>
            </div>
            <div className="about-image">
              <img src="/resources/images/soon.webp" alt="Coming Soon" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Mazecraft News Section */}
      <section className="news-section section" aria-label="Mazecraft News">
        <div className="container">
          <h2 className="section-title">Mazecraft News</h2>

          <div className="news-grid">
            {/* Season 2 Launch News */}
            <article className="news-card news-card-featured">
              <div className="news-card-badge">NEW</div>
              <div className="news-card-header">
                <div className="news-card-date">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                  <span>February 2, 2026</span>
                </div>
                <h3 className="news-card-title">Season 2 is Now Live – Mostly Vanilla S2</h3>
              </div>
              <div className="news-card-body">
                <p className="news-card-summary">
                  Season 2 of the MCN SMP has officially begun with fresh terrain generation and exciting new features!
                </p>
                <ul className="news-card-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>New terrain generation for Overworld, Nether, and the End</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>New backpacks for improved storage and progression</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>New structures to discover while exploring</span>
                  </li>
                </ul>
                <p className="news-card-footer">
                  Happy playing,<br /><strong>Team MCN</strong>
                </p>
              </div>
            </article>

            {/* Season 1 Ended News */}
            <article className="news-card">
              <div className="news-card-header">
                <div className="news-card-date">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                  <span>February 1, 2026</span>
                </div>
                <h3 className="news-card-title">Season 1 Ended Early – Season 2 Announcement</h3>
              </div>
              <div className="news-card-body">
                <p className="news-card-summary">
                  Thank you to every player who joined Season 1! We learned many things and gained valuable experience during this testing phase.
                </p>
                <p className="news-card-text">
                  As our community continues to grow, we decided to end Season 1 earlier than planned to bring you Season 2 sooner with improvements and a better experience.
                </p>
                <div className="news-card-schedule">
                  <div className="schedule-item">
                    <strong>Server Offline (Maintenance):</strong>
                    <span>Sunday, February 1, 2026 at 4:00 PM IST</span>
                  </div>
                  <div className="schedule-item">
                    <strong>Season 2 Launch:</strong>
                    <span>Monday, February 2, 2026 at 10:30 AM IST</span>
                  </div>
                </div>
                <p className="news-card-footer">
                  Regards,<br /><strong>Team MCN</strong>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Our Community Section */}
      <section id="community" className="community-section section" aria-label="Community">
        <div className="container">
          <h2 className="section-title">Join Our Community</h2>

          <div className="community-container">
            <div className="community-widget">
              <iframe
                src="https://discord.com/widget?id=1414475115269193831&theme=dark"
                allowTransparency={true}
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Discord Widget"
              ></iframe>
            </div>

            <div className="community-content">
              <h2>Connect With Players</h2>
              <p>Join our vibrant Discord community with active members. Get support, share your builds, participate in events, and make new friends!</p>
              <p>Stay updated with server announcements, patch notes, and exclusive community events.</p>
              <a href="https://discord.gg/HrRdV5jmua" className="btn btn-discord" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord Server
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home