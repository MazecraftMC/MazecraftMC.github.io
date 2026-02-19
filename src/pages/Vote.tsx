import { useEffect } from 'react'
import anime from 'animejs'
import { useToast } from '../components/ToastContext'
import '../styles/pages/Vote.css'

interface VotingSite {
  name: string
  url: string
  description: string
}

const Vote = () => {
  const { showToast } = useToast()

  const votingSites: VotingSite[] = [
    {
      name: 'Minecraft.Buzz',
      url: 'https://minecraft.buzz/vote/18471',
      description: 'Vote once every 24 hours and unlock exclusive rewards!'
    },
    {
      name: 'MinecraftServers.org',
      url: 'https://minecraftservers.org/vote/682202',
      description: 'Help us grow with your daily vote and earn coins!'
    },
    {
      name: 'Minecraft-Server-List',
      url: 'https://minecraft-server-list.com/server/517103/vote',
      description: 'Support us with your vote and get rewarded instantly!'
    },
    {
      name: 'Minecraft-MP',
      url: 'https://minecraft-mp.com/server/352767/vote',
      description: 'Climb the ranks with your vote and earn top rewards!'
    },
    {
      name: 'Minecraft-Server.net',
      url: 'https://minecraft-server.net/vote/MazecraftMCN',
      description: 'Climb the ranks with your vote and earn top rewards!'
    },
    {
      name: 'TopG',
      url: 'https://topg.org/minecraft-servers/server-679368#vote',
      description: 'Climb the ranks with your vote and earn top rewards!'
    }
  ]

  useEffect(() => {
    anime({
      targets: '.vote-header',
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.vote-list-item',
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: anime.stagger(100, { start: 300 }),
      easing: 'easeOutExpo'
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

        <div className="vote-list">
          {votingSites.map((site, index) => (
            <a
              key={index}
              className="vote-list-item"
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => showToast(`Opening ${site.name}...`, 'info')}
            >
              <span className="vote-list-badge">{index + 1}</span>
              <div className="vote-list-info">
                <span className="vote-list-name">{site.name}</span>
                <span className="vote-list-desc">{site.description}</span>
              </div>
              <span className="vote-list-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vote