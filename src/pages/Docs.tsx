import { useState, useEffect } from 'react'
import '../styles/pages/Docs.css'

const Docs = () => {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [recipesExpanded, setRecipesExpanded] = useState(false)

  useEffect(() => {
    // Handle sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle')
    const sidebarClose = document.getElementById('sidebarClose')

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const closeSidebar = () => setSidebarOpen(false)

    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar)
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar)

    return () => {
      if (sidebarToggle) sidebarToggle.removeEventListener('click', toggleSidebar)
      if (sidebarClose) sidebarClose.removeEventListener('click', closeSidebar)
    }
  }, [sidebarOpen])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setSidebarOpen(false)
    
    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          // Find the first h1 heading within the section
          const heading = element.querySelector('h1')
          const targetElement = heading || element
          
          // Calculate the position accounting for navbar height
          const navbarHeight = 70 // var(--navbar-height)
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navbarHeight
          
          // Scroll to the calculated position
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      })
    })
  }

  const toggleRecipes = (e: React.MouseEvent) => {
    e.preventDefault()
    setRecipesExpanded(!recipesExpanded)
  }

  return (
    <div className="docs-layout">
      {/* Sidebar */}
      <aside className={`docs-sidebar ${sidebarOpen ? 'open' : ''}`} id="docsSidebar">
        <div className="docs-sidebar-header">
          <h2>Documentation</h2>
          <button className="docs-sidebar-close" id="sidebarClose" aria-label="Close Sidebar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="docs-sidebar-content">
          <nav className="docs-nav">
            {/* Getting Started */}
            <div className="docs-nav-section">
              <a
                href="#getting-started"
                className={`docs-nav-item ${activeSection === 'getting-started' ? 'active' : ''}`}
                data-section="getting-started"
                onClick={(e) => { e.preventDefault(); scrollToSection('getting-started'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
                </svg>
                <span>Getting Started</span>
              </a>
            </div>

            {/* Recipes */}
            <div className="docs-nav-section">
              <button 
                className={`docs-nav-item docs-nav-toggle ${recipesExpanded ? 'expanded' : ''}`} 
                data-section="recipes"
                onClick={toggleRecipes}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
                <span>Recipes</span>
                <svg className="docs-nav-arrow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
              <div className={`docs-nav-submenu ${recipesExpanded ? 'open' : ''}`}>
                <a
                  href="#recipes-backpacks"
                  className={`docs-nav-subitem ${activeSection === 'recipes-backpacks' ? 'active' : ''}`}
                  data-section="recipes-backpacks"
                  onClick={(e) => { e.preventDefault(); scrollToSection('recipes-backpacks'); }}
                >
                  <span>Backpacks</span>
                </a>
              </div>
            </div>

            {/* Claim System */}
            <div className="docs-nav-section">
              <a
                href="#claim-system"
                className={`docs-nav-item ${activeSection === 'claim-system' ? 'active' : ''}`}
                data-section="claim-system"
                onClick={(e) => { e.preventDefault(); scrollToSection('claim-system'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
                <span>Claim System</span>
              </a>
            </div>

            {/* Graves System */}
            <div className="docs-nav-section">
              <a
                href="#graves-system"
                className={`docs-nav-item ${activeSection === 'graves-system' ? 'active' : ''}`}
                data-section="graves-system"
                onClick={(e) => { e.preventDefault(); scrollToSection('graves-system'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 3.04 2.12 5.61 5 6.32V20H7v2h10v-2h-3v-4.68c2.88-.71 5-3.28 5-6.32 0-3.87-3.13-7-7-7zm0 10c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                </svg>
                <span>Graves System</span>
              </a>
            </div>

            {/* Creator Ranks */}
            <div className="docs-nav-section">
              <a
                href="#creator-ranks"
                className={`docs-nav-item ${activeSection === 'creator-ranks' ? 'active' : ''}`}
                data-section="creator-ranks"
                onClick={(e) => { e.preventDefault(); scrollToSection('creator-ranks'); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span>Creator Ranks</span>
              </a>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button className="docs-sidebar-toggle" id="sidebarToggle" aria-label="Toggle Sidebar">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Main Content */}
      <main className="docs-content">
        <div className="docs-content-inner">
          {/* Getting Started Section */}
          <section id="getting-started" className={`docs-section ${activeSection === 'getting-started' ? 'active' : ''}`}>
            <h1>Getting Started</h1>
            <p className="docs-lead">Welcome to MazecraftMC! This guide will help you get started on our server.</p>

            <h2>Joining the Server</h2>
            <p>I. To join MazecraftMC using Minecraft Java Edition, follow these simple steps:</p>
            <ol>
              <li>Open Minecraft Java Edition</li>
              <li>Click on "Multiplayer"</li>
              <li>Click "Add Server"</li>
              <li>Enter the server address: <code>play.mazecraftmc.fun</code></li>
              <li>Click "Done" and join the server!</li>
            </ol>

            <p>II. To join MazecraftMC using Minecraft Bedrock Edition, follow these simple steps:</p>
            <ol>
              <li>Open Minecraft Bedrock Edition</li>
              <li>Click on "Play"</li>
              <li>Click "Add Server"</li>
              <li>Enter the server address: <code>play.mazecraftmc.fun</code></li>
              <li>Enter the server port: <code>25571</code></li>
              <li>Click "Done" and join the server!</li>
            </ol>

            <div className="docs-callout docs-callout-info">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div>
                <strong>Server Version</strong>
                <p>We support Minecraft Java Edition & Minecraft Bedrock Edition 1.21.x and above.</p>
              </div>
            </div>

            <h2>First Steps</h2>
            <p>Once you've joined the server, here's what you should do first:</p>
            <ul>
              <li><strong>Login:</strong> Use <code>/register "password" "password"</code> to register yourself in the server, for the first time.</li>
              <li><strong>Login:</strong> Use <code>/login "password" "password"</code> to login to your account.</li>
              <li><strong>Note:</strong> Passwords are case sensitive. Make sure to remember your password. You will need this every time you join the server.</li>
            </ul>

            <h2>Basic Commands</h2>
            <div className="docs-table-wrapper">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>/spawn</code></td>
                    <td>Teleport to world spawn</td>
                  </tr>
                  <tr>
                    <td><code>/sethome [name]</code></td>
                    <td>Set a home location</td>
                  </tr>
                  <tr>
                    <td><code>/home [name]</code></td>
                    <td>Teleport to your home</td>
                  </tr>
                  <tr>
                    <td><code>/tpa [player]</code></td>
                    <td>Request to teleport to a player</td>
                  </tr>
                  <tr>
                    <td><code>/tpahere [player]</code></td>
                    <td>Request to teleport a player to you</td>
                  </tr>
                  <tr>
                    <td><code>/tpaccept [player]</code></td>
                    <td>Accept a teleport request</td>
                  </tr>
                  <tr>
                    <td><code>/tpdeny [player]</code></td>
                    <td>Deny a teleport request</td>
                  </tr>
                  <tr>
                    <td><code>/map</code></td>
                    <td>Open the interactive web map</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Recipes Section */}
          <section id="recipes-backpacks" className={`docs-section ${activeSection === 'recipes-backpacks' ? 'active' : ''}`}>
            <h1>Backpacks</h1>
            <p className="docs-lead">Backpacks provide additional portable storage for your adventures.</p>

            <h2>Overview</h2>
            <p>Backpacks are custom items that allow you to carry extra items without filling your inventory. They come in different sizes and can be upgraded.</p>

            <h2>Crafting Recipes</h2>

            <h3>Basic Backpack</h3>
            <p>The basic backpack with 9 slots of storage.</p>
            <div className="docs-recipe">
              <div className="docs-recipe-grid">
                <div className="docs-recipe-item"><img src="/resources/minecraft/leather.webp" alt="Leather" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/iron_ingot.webp" alt="Iron Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/leather.webp" alt="Leather" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/iron_ingot.webp" alt="Iron Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/chest.png" alt="Chest" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/iron_ingot.webp" alt="Iron Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/iron_block.png" alt="Iron Block" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/iron_ingot.webp" alt="Iron Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/iron_block.png" alt="Iron Block" /></div>
              </div>
              <div className="docs-recipe-arrow">→</div>
              <div className="docs-recipe-result">
                <div className="docs-recipe-item result">Basic Backpack</div>
              </div>
            </div>

            <h3>Gold Backpack</h3>
            <p>Gold backpack with 20 slots of storage.</p>
            <div className="docs-recipe">
              <div className="docs-recipe-grid">
                <div className="docs-recipe-item"><img src="/resources/minecraft/leather.webp" alt="Leather" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/gold_ingot.png" alt="Gold Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/leather.webp" alt="Leather" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/gold_ingot.png" alt="Gold Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/chest.png" alt="Chest" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/gold_ingot.png" alt="Gold Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/gold_block.png" alt="Gold Block" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/gold_ingot.png" alt="Gold Ingot" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/gold_block.png" alt="Gold Block" /></div>
              </div>
              <div className="docs-recipe-arrow">→</div>
              <div className="docs-recipe-result">
                <div className="docs-recipe-item result">Gold Backpack</div>
              </div>
            </div>

            <h3>Diamond Backpack</h3>
            <p>The largest backpack with 54 slots of storage.</p>
            <div className="docs-recipe">
              <div className="docs-recipe-grid">
                <div className="docs-recipe-item"><img src="/resources/minecraft/leather.webp" alt="Leather" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/diamond.png" alt="Diamond" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/leather.webp" alt="Leather" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/diamond.png" alt="Diamond" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/chest.png" alt="Chest" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/diamond.png" alt="Diamond" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/diamond_block.png" alt="Diamond Block" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/diamond.png" alt="Diamond" /></div>
                <div className="docs-recipe-item"><img src="/resources/minecraft/diamond_block.png" alt="Diamond Block" /></div>
              </div>
              <div className="docs-recipe-arrow">→</div>
              <div className="docs-recipe-result">
                <div className="docs-recipe-item result">Diamond Backpack</div>
              </div>
            </div>

            <h2>Usage</h2>
            <p>To use a backpack:</p>
            <ol>
              <li>Hold the backpack in your hand</li>
              <li>Right-click to open the backpack inventory</li>
              <li>Store or retrieve items as needed</li>
              <li>The backpack retains its contents even when dropped</li>
            </ol>

            <div className="docs-callout docs-callout-warning">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <div>
                <strong>Important</strong>
                <p>Backpacks cannot be placed in other backpacks. Keep them safe!</p>
              </div>
            </div>
          </section>

          {/* Graves System */}
          <section id="graves-system" className={`docs-section ${activeSection === 'graves-system' ? 'active' : ''}`}>
            <h1>Graves System</h1>
            <p className="docs-lead">When you die, your inventory and your xp is saved in a grave.</p>
            <p>Click on the grave to pick up your inventory and xp.</p>
            <h2>Grave Command</h2>
            <div className="docs-table-wrapper">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>/graves list</code></td>
                    <td>To see your graves</td>
                  </tr>
                  <tr>
                    <td><code>/graves tp &lt;id&gt;</code></td>
                    <td>To teleport to your grave</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Claim System Section */}
          <section id="claim-system" className={`docs-section ${activeSection === 'claim-system' ? 'active' : ''}`}>
            <h1>Claim System</h1>
            <p className="docs-lead">Protect your builds and items from griefing with our claim system.</p>

            <h2>What is a Claim?</h2>
            <p>A claim is a protected area where only you and players you trust can build, break blocks, or interact with items. Claims prevent griefing and ensure your hard work is safe.</p>

            <h2>Creating a Claim</h2>
            <p>To create a claim, follow these steps:</p>
            <ol>
              <li>Use the command <strong>/claim</strong> to claim one chunk</li>
              <li>Your claim is now created!</li>
            </ol>

            <h2>Claim Commands</h2>
            <div className="docs-table-wrapper">
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>/claim</code></td>
                    <td>Claim the chunk you're standing in</td>
                  </tr>
                  <tr>
                    <td><code>/unclaim</code></td>
                    <td>Unclaim the chunk you're standing in</td>
                  </tr>
                  <tr>
                    <td><code>/trust &lt;player&gt;</code></td>
                    <td>Trust a player to build in your claims</td>
                  </tr>
                  <tr>
                    <td><code>/untrust &lt;player&gt;</code></td>
                    <td>Remove trust from a player</td>
                  </tr>
                  <tr>
                    <td><code>/claims list</code></td>
                    <td>List all your claims</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Claim Chunks</h2>
            <p>Maximum number of claims every player has is 8</p>
            <p>Maximum Chunks per claim: 12 chunks</p>
            <p>Maximum Chunks Total: 26 chunks</p>

            <div className="docs-callout docs-callout-success">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div>
                <strong>Pro Tip</strong>
                <p>Use <code>/claimchunks</code> to check how many claim chunks you have available.</p>
              </div>
            </div>
          </section>

          {/* Creator Ranks Section */}
          <section id="creator-ranks" className={`docs-section ${activeSection === 'creator-ranks' ? 'active' : ''}`}>
            <h1>Creator Ranks</h1>
            <p className="docs-lead">Join our Creator Program and get recognized for your content!</p>
            
            <h2>What are Creator Ranks?</h2>
            <p>Creator Ranks are special ranks given to content creators who make videos, streams, or other content featuring MazecraftMC. These ranks come with exclusive perks and help us grow our community.</p>

            <h2>Eligibility Requirements</h2>
            <p>To qualify for a Creator Rank, you must meet one of the following criteria:</p>
            
            <h3>YouTube Creator</h3>
            <ul>
              <li>200+ subscribers</li>
              <li>At least 1 video featuring MazecraftMC</li>
              <li>Active channel (1+ video per month)</li>
            </ul>

            <h3>Twitch Streamer</h3>
            <ul>
              <li>Twitch Affiliate or Partner status</li>
              <li>Average 5+ concurrent viewers</li>
              <li>Stream MazecraftMC at least twice per month</li>
            </ul>

            <h2>Creator Perks</h2>
            <div className="docs-perks-grid">
              <div className="docs-perk-card">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <h4>Exclusive Badge</h4>
                <p>Special creator badge next to your name in-game and on Discord</p>
              </div>
              <div className="docs-perk-card">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                <h4>Creator Chat</h4>
                <p>Access to private creator Discord channel for collaboration</p>
              </div>
              <div className="docs-perk-card">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h4>Priority Support</h4>
                <p>Fast-track support for any server issues or questions</p>
              </div>
              <div className="docs-perk-card">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                </svg>
                <h4>Featured Content</h4>
                <p>Your content may be featured on our website and social media</p>
              </div>
            </div>

            <h2>How to Apply</h2>
            <p>Ready to join our Creator Program? Follow these steps:</p>
            <ol>
              <li>Join our Discord server</li>
              <li>Open a ticket in the <code>#tickets</code> channel on our discord</li>
              <li>Provide links to your content and channel statistics</li>
              <li>Wait for our team to review your application (usually 3-5 days)</li>
            </ol>

            <div className="docs-callout docs-callout-info">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div>
                <strong>Questions?</strong>
                <p>Contact us on Discord or email creators@mazecraftmc.fun for more information.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Docs