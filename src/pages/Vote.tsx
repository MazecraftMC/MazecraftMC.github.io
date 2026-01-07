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
      description: 'You can vote once every 24 hours. Unlock exclusive in-game rewards!',
      rewards: '+500 Coins'
    },
    {
      name: 'MinecraftServers.org',
      url: 'https://minecraftservers.org/vote/682202',
      description: 'You can vote once every 24 hours. Earn rewards and help us grow!',
      rewards: '+400 Coins'
    },
    {
      name: 'MCSL',
      url: 'https://minecraft-server-list.com/server/517103/vote',
      description: 'you can vote once every 24 hours. Support us and earn rewards!',
      rewards: '+300 Coins'
    },
    {
      name: 'Planet Minecraft',
      url: 'https://www.planetminecraft.com/server/mazecraftmc/vote',
      description: 'You can vote once every 24 hours. Help us climb the ranks!',
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
          <h1 className="vote-title">Vote for MazecraftMC</h1>
          <p className="vote-subtitle">
            Support the server and earn rewards. Each vote helps us grow and unlocks exclusive perks for you.
          </p>
        </div>

        <div className="vote-sites-grid">
          {votingSites.map((site, index) => (
            <div key={index} className="vote-card vote-card-accent">
              <div className="vote-card-header">
                <h3 className="vote-card-title">{site.name}</h3>
              </div>
              
              <p className="vote-card-description">{site.description}</p>
              
              <div className="vote-rewards">
                <span className="vote-reward-label">Rewards:</span>
                <span className="vote-reward">{site.rewards}</span>
              </div>

              <button 
                className="vote-button vote-button-accent"
                onClick={() => handleVoteClick(site)}
              >
                Vote Now
                <span className="vote-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vote