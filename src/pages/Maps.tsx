import { useEffect } from 'react'
import anime from 'animejs'
import { Link } from 'react-router-dom'
import '../styles/pages/Maps.css'

const Maps = () => {
  useEffect(() => {
    // Animate icon with scale and fade
    anime({
      targets: '.map-icon-container svg',
      scale: [0, 1],
      opacity: [0, 0.8],
      rotate: ['-20deg', '0deg'],
      duration: 1200,
      delay: 200,
      easing: 'easeOutElastic(1, .6)'
    })
    
    // Animate "Coming Soon" text
    anime({
      targets: '.map-coming-soon',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 800,
      easing: 'easeOutExpo'
    })
    
    // Animate description
    anime({
      targets: '.coming-soon-desc',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: 1000,
      easing: 'easeOutExpo'
    })
    
    // Animate features
    anime({
      targets: '.coming-soon-feature',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100, { start: 1200 }),
      easing: 'easeOutExpo'
    })
    
    // Animate action buttons
    anime({
      targets: '.coming-soon-actions .btn',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100, { start: 1600 }),
      easing: 'easeOutExpo'
    })
  }, [])

  return (
    <div className="page-container">
      <div className="container">
        <div className="map-simple-layout">
          <div className="map-icon-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
            </svg>
          </div>
          <h1 className="map-coming-soon">Live Map Coming Soon</h1>
          <p className="coming-soon-desc">We're working on an interactive world map with real-time player positions and claim areas</p>
          <div className="coming-soon-features">
            <div className="coming-soon-feature">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Real-time Updates</span>
            </div>
            <div className="coming-soon-feature">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Player Tracking</span>
            </div>
            <div className="coming-soon-feature">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Claim Visualization</span>
            </div>
          </div>
          <div className="coming-soon-actions">
            <Link to="/" className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Back to Home
            </Link>
            <a href="https://discord.gg/HrRdV5jmua" className="btn btn-discord" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Get Notified
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maps