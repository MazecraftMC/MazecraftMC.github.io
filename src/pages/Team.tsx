import { useEffect, useState } from 'react'
import '../styles/pages/Pages.css'

interface TeamMember {
  name: string
  role: string
  ign: string
  discord: string
  twitter: string
  youtube: string
  image: string
}

const Team = () => {
  const [teamMembers] = useState<TeamMember[]>([
    { name: 'Pixelis0P', role: 'Developer', ign: 'Pixelis0P', discord: '#', twitter: '#', youtube: '#', image: '/resources/staff/pixelis0p-head.png' },
    { name: 'Siddharthz', role: 'Admin', ign: 'Siddharthz', discord: '#', twitter: '#', youtube: '#', image: '/resources/staff/Siddharthz-head.png' }
  ])

  useEffect(() => {
    // Animate team cards
    const cards = document.querySelectorAll('.team-card')
    cards.forEach((card, index) => {
      import('animejs').then((anime) => {
        anime.default({
          targets: card,
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 600,
          delay: index * 100 + 300,
          easing: 'easeOutExpo'
        })
      })
    })
  }, [])

  return (
    <div className="page-container">
      <div className="page-hero fade-in">
        <h1>Our Team</h1>
        <p>Meet the dedicated staff members who make Mazecraft possible</p>
      </div>

      <div className="container">
        <div className="team-grid" id="teamGrid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card fade-in">
              <div className="team-card-image">
                <img src={member.image} alt={member.name} loading="lazy" />
                <div className="team-card-overlay">
                  <div className="team-socials">
                    <a href={member.discord} className="team-social-link" aria-label="Discord">
                      <svg viewBox="0 0 24 24" fill="currentColor"><use href="#icon-discord"></use></svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-card-content">
                <h3 className="team-member-name">{member.name}</h3>
                <span className="team-member-role">{member.role}</span>
                <div className="team-member-ign">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  <span>{member.ign}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Icons */}
      <svg style={{ display: 'none' }}>
        <defs>
          <symbol id="icon-discord" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </symbol>
        </defs>
      </svg>
    </div>
  )
}

export default Team