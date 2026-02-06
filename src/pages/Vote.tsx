import { useEffect } from 'react'
import anime from 'animejs'
import { useToast } from '../components/ToastContext'
import '../styles/pages/Vote.css'

interface VotingSite {
  name: string
  url: string
  description: string
  rewards: string
}

const Vote = () => {
  const { showToast } = useToast()

  const votingSites: VotingSite[] = [
    {
      name: 'Minecraft.Buzz',
      url: 'https://minecraft.buzz/vote/18471',
      description: 'Vote once every 24 hours and unlock exclusive rewards!',
      rewards: '+500 Coins'
    },
    {
      name: 'MinecraftServers.org',
      url: 'https://minecraftservers.org/vote/682202',
      description: 'Help us grow with your daily vote and earn coins!',
      rewards: '+400 Coins'
    },
    {
      name: 'MCSL',
      url: 'https://minecraft-server-list.com/server/517103/vote',
      description: 'Support us with your vote and get rewarded instantly!',
      rewards: '+300 Coins'
    },
    {
      name: 'Planet Minecraft',
      url: 'https://www.planetminecraft.com/server/mazecraftmc/vote',
      description: 'Climb the ranks with your vote and earn top rewards!',
      rewards: '+600 Coins'
    }
  ]

  const handleVoteClick = (site: VotingSite) => {
    showToast(`Opening ${site.name}...`, 'info')
    window.open(site.url, '_blank', 'noopener,noreferrer')
  }

  // Initialize animations
  useEffect(() => {
    // Animate header
    anime({
      targets: '.vote-header',
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    })

    // Animate voting site cards
    anime({
      targets: '.vote-card',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(150, { start: 300 }),
      easing: 'easeOutExpo'
    })

    // Animate reward badges
    anime({
      targets: '.vote-reward',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 500,
      delay: anime.stagger(100, { start: 800 }),
      easing: 'easeOutElastic(1, .6)'
    })
  }, [])

  return (
    <div className="vote">
      <div className="vote-container">
        <div className="vote-header">
          <h1 className="vote-title">Vote for Us!</h1>
          <p className="vote-subtitle">
            Support MazecraftMC and earn exclusive in-game rewards with every vote.
          </p>
        </div>

        <div className="vote-sites-grid">
          {votingSites.map((site, index) => (
            <div key={index} className="vote-card">
              <div className="vote-card-header">
                <span className="vote-card-badge">{index + 1}</span>
                <h3 className="vote-card-title">{site.name}</h3>
              </div>

              <p className="vote-card-description">{site.description}</p>

              <div className="vote-card-footer">
                <div className="vote-rewards">
                  <span className="vote-reward-label">Reward</span>
                  <span className="vote-reward">{site.rewards}</span>
                </div>

                <button
                  className="vote-button"
                  onClick={() => handleVoteClick(site)}
                >
                  Vote Now
                  <span className="vote-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="vote-info">
          <div className="vote-info-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </div>
          <div className="vote-info-content">
            <h4>How Voting Works</h4>
            <ul>
              <li>Vote on each site once every 24 hours</li>
              <li>Rewards are credited instantly to your account</li>
              <li>Make sure you're logged in to receive rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vote