import { useState } from 'react'
import '../styles/pages/Docs.css'

// Types
interface NavItem {
    id: string
    title: string
    icon: React.ReactNode
    subsections?: { id: string; title: string }[]
}

interface LoreItem {
    name: string
    rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
    description?: string
    type?: string
}

// Navigation structure
const navItems: NavItem[] = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z" />
            </svg>
        )
    },
    {
        id: 'player-commands',
        title: 'Player Commands',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
        ),
        subsections: [
            { id: 'teleport-commands', title: 'Teleport Commands' },
            { id: 'home-commands', title: 'Home Commands' },
            { id: 'claim-commands', title: 'Land Claim Commands' },
            { id: 'jobs-commands', title: 'Jobs Commands' },
            { id: 'trades-commands', title: 'Trades Commands' },
            { id: 'shop-commands', title: 'Shop Commands' },
            { id: 'misc-commands', title: 'Miscellaneous Commands' }
        ]
    },
    {
        id: 'custom-features',
        title: 'Custom Features & Recipes',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
        ),
        subsections: [
            { id: 'backpack-recipes', title: 'Backpack Recipes' },
            { id: 'armor-recipes', title: 'Armor Recipes' },
            { id: 'weapons', title: 'Weapons' },
            { id: 'waystone-warps', title: 'Waystone Warps' }
        ]
    }
]

// Crafting Table Component
const CraftingTable: React.FC<{
    recipe: (string | null)[][]
    output: { image: string; name: string; lore?: LoreItem }
}> = ({ recipe, output }) => {
    const [hoveredItem, setHoveredItem] = useState<LoreItem | null>(null)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent, item: LoreItem | null) => {
        if (item) {
            setTooltipPos({ x: e.clientX, y: e.clientY })
            setHoveredItem(item)
        }
    }

    const getLoreFromImage = (img: string | null): LoreItem | null => {
        if (!img) return null
        const name = img.split('/').pop()?.replace(/\.(png|webp|jpg)$/, '').replace(/_/g, ' ') || ''
        return { name: name.charAt(0).toUpperCase() + name.slice(1), rarity: 'common' }
    }

    return (
        <div className="crafting-container">
            <div className="crafting-table">
                <div className="crafting-grid">
                    {recipe.flat().map((item, index) => (
                        <div
                            key={index}
                            className={`crafting-slot ${item ? 'has-item' : ''}`}
                            onMouseMove={(e) => handleMouseMove(e, getLoreFromImage(item))}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {item && <img src={item} alt="" draggable={false} />}
                        </div>
                    ))}
                </div>
            </div>
            <div className="crafting-arrow">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
            </div>
            <div
                className="crafting-output"
                onMouseMove={(e) => handleMouseMove(e, output.lore || { name: output.name, rarity: 'rare' })}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div className="crafting-slot output-slot has-item">
                    <img src={output.image} alt={output.name} draggable={false} />
                </div>
                <span className="output-name">{output.name}</span>
            </div>

            {hoveredItem && (
                <div
                    className="minecraft-tooltip"
                    style={{
                        left: tooltipPos.x + 12,
                        top: tooltipPos.y + 12
                    }}
                >
                    <span className={`tooltip-name ${hoveredItem.rarity || 'common'}`}>
                        {hoveredItem.name}
                    </span>
                    {hoveredItem.description && (
                        <span className="tooltip-desc">{hoveredItem.description}</span>
                    )}
                    {hoveredItem.type && (
                        <span className="tooltip-type">{hoveredItem.type}</span>
                    )}
                </div>
            )}
        </div>
    )
}

// Command Table Component
const CommandTable: React.FC<{
    commands: { command: string; description: string }[]
}> = ({ commands }) => (
    <div className="command-table-wrapper">
        <table className="command-table">
            <thead>
                <tr>
                    <th>Command</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {commands.map((cmd, index) => (
                    <tr key={index}>
                        <td><code>{cmd.command}</code></td>
                        <td>{cmd.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

// Callout Component
const Callout: React.FC<{
    type: 'info' | 'warning' | 'tip' | 'danger'
    title?: string
    children: React.ReactNode
}> = ({ type, title, children }) => (
    <div className={`callout callout-${type}`}>
        <div className="callout-icon">
            {type === 'info' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
            )}
            {type === 'warning' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
            )}
            {type === 'tip' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
                </svg>
            )}
            {type === 'danger' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                </svg>
            )}
        </div>
        <div className="callout-content">
            {title && <strong>{title}</strong>}
            <div>{children}</div>
        </div>
    </div>
)

// Main Docs Component
const Docs: React.FC = () => {
    const [activeSection, setActiveSection] = useState('getting-started')
    const [expandedSections, setExpandedSections] = useState<string[]>(['player-commands', 'custom-features'])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const navigateTo = (id: string) => {
        setActiveSection(id)
        setSidebarOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Recipe data
    const basicBackpackRecipe = [
        ['/resources/minecraft/leather.webp', '/resources/minecraft/iron_ingot.webp', '/resources/minecraft/leather.webp'],
        ['/resources/minecraft/iron_ingot.webp', '/resources/minecraft/chest.png', '/resources/minecraft/iron_ingot.webp'],
        ['/resources/minecraft/iron_block.png', '/resources/minecraft/iron_ingot.webp', '/resources/minecraft/iron_block.png']
    ]

    const goldBackpackRecipe = [
        ['/resources/minecraft/leather.webp', '/resources/minecraft/gold_ingot.png', '/resources/minecraft/leather.webp'],
        ['/resources/minecraft/gold_ingot.png', '/resources/minecraft/chest.png', '/resources/minecraft/gold_ingot.png'],
        ['/resources/minecraft/gold_block.png', '/resources/minecraft/gold_ingot.png', '/resources/minecraft/gold_block.png']
    ]

    const diamondBackpackRecipe = [
        ['/resources/minecraft/leather.webp', '/resources/minecraft/diamond.png', '/resources/minecraft/leather.webp'],
        ['/resources/minecraft/diamond.png', '/resources/minecraft/chest.png', '/resources/minecraft/diamond.png'],
        ['/resources/minecraft/diamond_block.png', '/resources/minecraft/diamond.png', '/resources/minecraft/diamond_block.png']
    ]

    return (
        <div className="docs-page">
            {/* Mobile Header */}
            <div className="docs-mobile-header">
                <button
                    className="docs-menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle menu"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                </button>
                <span className="docs-mobile-title">Documentation</span>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div className="docs-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`docs-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="docs-sidebar-header">
                    <h2>Documentation</h2>
                </div>

                <nav className="docs-nav">
                    {navItems.map(item => (
                        <div key={item.id} className="docs-nav-section">
                            <button
                                className={`docs-nav-item ${activeSection === item.id ? 'active' : ''} ${item.subsections ? 'has-children' : ''}`}
                                onClick={() => {
                                    if (item.subsections) {
                                        toggleSection(item.id)
                                    } else {
                                        navigateTo(item.id)
                                    }
                                }}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.title}</span>
                                {item.subsections && (
                                    <svg
                                        className={`nav-arrow ${expandedSections.includes(item.id) ? 'expanded' : ''}`}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                    </svg>
                                )}
                            </button>
                            {item.subsections && expandedSections.includes(item.id) && (
                                <div className="docs-nav-subsections">
                                    {item.subsections.map(sub => (
                                        <button
                                            key={sub.id}
                                            className={`docs-nav-subitem ${activeSection === sub.id ? 'active' : ''}`}
                                            onClick={() => navigateTo(sub.id)}
                                        >
                                            {sub.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="docs-content">
                {/* Getting Started */}
                {activeSection === 'getting-started' && (
                    <section className="docs-section">
                        <h1>Getting Started</h1>
                        <p className="docs-lead">
                            Welcome to MazecraftMC! This guide will help you get started on our server.
                        </p>

                        <h2>Joining the Server</h2>
                        <h3>Java Edition</h3>
                        <ol>
                            <li>Open Minecraft Java Edition</li>
                            <li>Click on "Multiplayer"</li>
                            <li>Click "Add Server"</li>
                            <li>Enter the server address: <code>play.mazecraftmc.fun</code></li>
                            <li>Click "Done" and join the server!</li>
                        </ol>

                        <h3>Bedrock Edition</h3>
                        <ol>
                            <li>Open Minecraft Bedrock Edition</li>
                            <li>Click on "Play"</li>
                            <li>Go to "Servers" tab and click "Add Server"</li>
                            <li>Enter the server address: <code>play.mazecraftmc.fun</code></li>
                            <li>Enter the port: <code>19132 (Default)</code></li>
                            <li>Click "Save" and join the server!</li>
                        </ol>

                        <Callout type="info" title="Server Version">
                            We support Minecraft Java Edition & Bedrock Edition 1.21.1 and above.
                        </Callout>

                        <h2>First Steps</h2>
                        <p>Once you've joined the server, here's what you should do first:</p>

                        <h3>Registration</h3>
                        <p>First time joining? Register your account:</p>
                        <CommandTable
                            commands={[
                                { command: '/register "password" "password"', description: 'Create your account (first time only)' },
                                { command: '/login "password"', description: 'Login to your account' }
                            ]}
                        />

                        <Callout type="warning" title="Important">
                            Passwords are case-sensitive. Remember your password as you'll need it every time you join!
                        </Callout>
                    </section>
                )}

                {/* Teleport Commands */}
                {activeSection === 'teleport-commands' && (
                    <section className="docs-section">
                        <h1>Teleport Commands</h1>
                        <p className="docs-lead">
                            Commands for teleporting to other players and locations.
                        </p>

                        <h2>Player Teleportation</h2>
                        <CommandTable
                            commands={[
                                { command: '/tpa <player>', description: 'Request to teleport to a player' },
                                { command: '/tpahere <player>', description: 'Request a player to teleport to you' },
                                { command: '/tpaccept', description: 'Accept an incoming teleport request' },
                                { command: '/tpdeny', description: 'Deny an incoming teleport request' },
                                { command: '/tpcancel', description: 'Cancel your outgoing teleport request' }
                            ]}
                        />

                        <h2>World Teleportation</h2>
                        <CommandTable
                            commands={[
                                { command: '/spawn', description: 'Teleport to the world spawn' },
                                { command: '/rtp', description: 'Random teleport to a safe location' }
                            ]}
                        />

                        <Callout type="tip" title="Pro Tip">
                            Teleport requests expire after 60 seconds. Make sure to accept/deny quickly!
                        </Callout>
                    </section>
                )}

                {/* Home Commands */}
                {activeSection === 'home-commands' && (
                    <section className="docs-section">
                        <h1>Home Commands</h1>
                        <p className="docs-lead">
                            Set and teleport to your personal home locations.
                        </p>

                        <CommandTable
                            commands={[
                                { command: '/sethome <name>', description: 'Set a home at your current location' },
                                { command: '/home <name>', description: 'Teleport to a saved home' },
                                { command: '/homes', description: 'List all your saved homes' },
                                { command: '/delhome <name>', description: 'Delete a saved home' }
                            ]}
                        />

                        <Callout type="info" title="Home Limit">
                            Players can have up to 3 homes. Supporters get additional home slots!
                        </Callout>
                    </section>
                )}

                {/* Claim Commands */}
                {activeSection === 'claim-commands' && (
                    <section className="docs-section">
                        <h1>Land Claim Commands</h1>
                        <p className="docs-lead">
                            Protect your builds with our chunk-based claim system.
                        </p>

                        <h2>How to Claim</h2>
                        <p>
                            To claim a chunk, use the command <code>/claim</code>. We recommend opening your chunk borders by pressing <strong>F3 + G</strong> to see your chunk borders.
                        </p>

                        <h2>Claim Management Commands</h2>
                        <CommandTable
                            commands={[
                                { command: '/claim', description: 'Claim the chunk you are standing in' },
                                { command: '/claim addchunk [claim-name]', description: 'Add an extra chunk to your claim' },
                                { command: '/claim setname [old-name] [new-name]', description: 'Change your claim\'s name' },
                                { command: '/claim setdesc [claim-name] [description]', description: 'Add a description to your claim' },
                                { command: '/claim merge [claim] [claim]', description: 'Merge two adjacent claims into one' },
                                { command: '/claim add [claim-name] [player]', description: 'Add a member to your claim' },
                                { command: '/claim settings [claim-name]', description: 'Access the settings of your claim(s)' },
                                { command: '/claim chat', description: 'Toggle claim chat mode (public or claim chat)' }
                            ]}
                        />

                        <h2>Claim Costs & Limits</h2>
                        <ul>
                            <li><strong>Maximum Claims:</strong> 20 claims per player</li>
                            <li><strong>Members per Claim:</strong> 12 members max</li>
                            <li><strong>Chunks per Claim:</strong> 150 chunks max</li>
                            <li><strong>Total Chunks:</strong> 300 chunks per player</li>
                            <li><strong>Claim Cost:</strong> $900 per claim</li>
                            <li><strong>Chunk Cost:</strong> $300 per chunk</li>
                        </ul>

                        <Callout type="tip" title="Pro Tip">
                            Press F3 + G to toggle chunk borders and easily see where your claims start and end!
                        </Callout>
                    </section>
                )}

                {/* Jobs Commands */}
                {activeSection === 'jobs-commands' && (
                    <section className="docs-section">
                        <h1>Jobs Commands</h1>
                        <p className="docs-lead">
                            Earn money by performing various jobs on the server.
                        </p>

                        <CommandTable
                            commands={[
                                { command: '/jobs browse', description: 'View available jobs' },
                                { command: '/jobs join <job>', description: 'Join a specific job' },
                                { command: '/jobs leave <job>', description: 'Leave a job' },
                                { command: '/jobs info <job>', description: 'View details about a job' },
                                { command: '/jobs stats', description: 'View your job statistics' },
                                { command: '/jobs top', description: 'View the top job earners' }
                            ]}
                        />

                        <h2>Available Jobs</h2>
                        <ul>
                            <li><strong>Miner:</strong> Earn money by mining ores and stone</li>
                            <li><strong>Woodcutter:</strong> Earn money by chopping trees</li>
                            <li><strong>Farmer:</strong> Earn money from farming crops</li>
                            <li><strong>Hunter:</strong> Earn money by killing mobs</li>
                            <li><strong>Fisherman:</strong> Earn money from fishing</li>
                            <li><strong>Builder:</strong> Earn money by placing blocks</li>
                        </ul>
                    </section>
                )}

                {/* Trades Commands */}
                {activeSection === 'trades-commands' && (
                    <section className="docs-section">
                        <h1>Trades Commands</h1>
                        <p className="docs-lead">
                            Trade items with other players safely.
                        </p>

                        <CommandTable
                            commands={[
                                { command: '/trade <player>', description: 'Send a trade request to a player' },
                                { command: '/trade accept', description: 'Accept an incoming trade request' },
                                { command: '/trade deny', description: 'Deny an incoming trade request' }
                            ]}
                        />

                        <h2>How Trading Works</h2>
                        <ol>
                            <li>Send a trade request with <code>/trade &lt;player&gt;</code></li>
                            <li>Both players add items to the trade window</li>
                            <li>Both players must confirm the trade</li>
                            <li>Items are exchanged safely</li>
                        </ol>
                    </section>
                )}

                {/* Misc Commands */}
                {activeSection === 'misc-commands' && (
                    <section className="docs-section">
                        <h1>Miscellaneous Commands</h1>
                        <p className="docs-lead">
                            Other useful commands available on the server.
                        </p>

                        <h2>Fun & Emote Commands</h2>
                        <CommandTable
                            commands={[
                                { command: '/sit', description: 'Sit anywhere' },
                                { command: '/spin', description: 'Spin continuously' },
                                { command: '/crawl', description: 'Start crawling' }
                            ]}
                        />

                        <h2>Economy Commands</h2>
                        <CommandTable
                            commands={[
                                { command: '/balance [player]', description: 'Check your or another player\'s balance' },
                                { command: '/bal [player]', description: 'Shorthand for /balance' },
                                { command: '/baltop', description: 'View the top players by balance' },
                                { command: '/pay [player] [amount]', description: 'Pay another player' }
                            ]}
                        />

                        <h2>Utility Commands</h2>
                        <CommandTable
                            commands={[
                                { command: '/vote', description: 'Open the vote GUI' },
                                { command: '/discord link', description: 'Link your Discord and Minecraft accounts' },
                                { command: '/skin set [skin-name/uuid]', description: 'Set or refresh your skin if not displaying correctly' }
                            ]}
                        />
                    </section>
                )}

                {/* Backpack Recipes */}
                {activeSection === 'backpack-recipes' && (
                    <section className="docs-section">
                        <h1>Backpack Recipes</h1>
                        <p className="docs-lead">
                            Craft backpacks for additional portable storage during your adventures.
                        </p>

                        <h2>Basic Backpack</h2>
                        <p>The starting backpack with <strong>9 slots</strong> of storage.</p>
                        <CraftingTable
                            recipe={basicBackpackRecipe}
                            output={{
                                image: '/resources/minecraft/chest.png',
                                name: 'Basic Backpack',
                                lore: {
                                    name: 'Basic Backpack',
                                    rarity: 'uncommon',
                                    description: '9 slots of portable storage',
                                    type: 'Storage'
                                }
                            }}
                        />

                        <h2>Gold Backpack</h2>
                        <p>An upgraded backpack with <strong>20 slots</strong> of storage.</p>
                        <CraftingTable
                            recipe={goldBackpackRecipe}
                            output={{
                                image: '/resources/minecraft/gold_block.png',
                                name: 'Gold Backpack',
                                lore: {
                                    name: 'Gold Backpack',
                                    rarity: 'rare',
                                    description: '20 slots of portable storage',
                                    type: 'Storage'
                                }
                            }}
                        />

                        <h2>Diamond Backpack</h2>
                        <p>The largest backpack with <strong>54 slots</strong> (double chest) of storage.</p>
                        <CraftingTable
                            recipe={diamondBackpackRecipe}
                            output={{
                                image: '/resources/minecraft/diamond_block.png',
                                name: 'Diamond Backpack',
                                lore: {
                                    name: 'Diamond Backpack',
                                    rarity: 'epic',
                                    description: '54 slots of portable storage',
                                    type: 'Storage'
                                }
                            }}
                        />

                        <Callout type="warning" title="Important">
                            Backpacks cannot be placed inside other backpacks. Keep them safe!
                        </Callout>
                    </section>
                )}

                {/* Armor Recipes */}
                {activeSection === 'armor-recipes' && (
                    <section className="docs-section">
                        <h1>Armor Recipes</h1>
                        <p className="docs-lead">
                            Custom armor sets available on the server.
                        </p>

                        <Callout type="info" title="Coming Soon">
                            Custom armor recipes are being added soon. Check back later for updates!
                        </Callout>
                    </section>
                )}

                {/* Weapons */}
                {activeSection === 'weapons' && (
                    <section className="docs-section">
                        <h1>Weapons</h1>
                        <p className="docs-lead">
                            Custom weapons with special abilities.
                        </p>

                        <Callout type="info" title="Coming Soon">
                            Custom weapon recipes are being added soon. Check back later for updates!
                        </Callout>
                    </section>
                )}

                {/* Waystone Warps */}
                {activeSection === 'waystone-warps' && (
                    <section className="docs-section">
                        <h1>Waystone Warps</h1>
                        <p className="docs-lead">
                            Travel quickly between discovered waystones.
                        </p>

                        <h2>What are Waystones?</h2>
                        <p>
                            Waystones are magical structures found throughout the world. Once discovered, you can teleport between them for fast travel.
                        </p>

                        <h2>Using Waystones</h2>
                        <ol>
                            <li>Find a waystone in the world (they spawn in villages and random locations)</li>
                            <li>Right-click the waystone to activate it</li>
                            <li>Once activated, you can teleport to it from any other waystone</li>
                        </ol>

                        <Callout type="tip" title="Pro Tip">
                            Build your base near a waystone for easy access to distant locations!
                        </Callout>
                    </section>
                )}

                {/* Shop Commands */}
                {activeSection === 'shop-commands' && (
                    <section className="docs-section">
                        <h1>Shop Commands</h1>
                        <p className="docs-lead">
                            Buy and sell items using the server shop and player shops.
                        </p>

                        <h2>Server Shop</h2>
                        <CommandTable
                            commands={[
                                { command: '/shop', description: 'Open the main server shop menu' },
                                { command: '/sell', description: 'Sell the item currently in your hand' },
                                { command: '/sellall', description: 'Sell all sellable items in your inventory' },
                                { command: '/sellgui', description: 'Open a GUI to sell items in bulk' }
                            ]}
                        />

                        <h2>Player Shops</h2>
                        <p>
                            Create chest shops to trade with other players.
                        </p>

                        <h3>Creating a Shop</h3>
                        <ol>
                            <li>Place a chest or barrel</li>
                            <li>Hold the item you want to sell</li>
                            <li>Left-click the container to create a shop</li>
                            <li>Follow the prompts to set your prices</li>
                        </ol>

                        <h3>Shop Types</h3>
                        <ul>
                            <li><strong>Sell Shop:</strong> Sell items to other players</li>
                            <li><strong>Buy Shop:</strong> Buy items from other players</li>
                            <li><strong>Trade Shop:</strong> Exchange items for other items</li>
                        </ul>

                        <Callout type="info" title="Shop Protection">
                            Your shop containers are automatically protected. Only you can break or modify them.
                        </Callout>
                    </section>
                )}
            </main>
        </div>
    )
}

export default Docs
