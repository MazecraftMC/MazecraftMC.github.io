# Parties & Friends

A modern party and friend system for PocketMine-MP 5 with multi-database support, cross-server synchronization, and a Forms-based UI.

[![PocketMine-MP](https://img.shields.io/badge/PocketMine--MP-5.0.0+-orange)](https://pmmp.io)
[![PHP Version](https://img.shields.io/badge/PHP-8.4+-blue)](https://www.php.net/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)](https://github.com/PixelMCN/PartiesAndFriends/releases)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Commands](#commands)
- [Configuration](#configuration)
- [Multi-Server Setup](#multi-server-setup)
- [Developer API](#developer-api)
- [Requirements](#requirements)
- [Support](#support)

---

## Features

### Party System

- Create and manage parties with configurable member limits
- Invite/remove players with expiring invite system
- Leader controls: kick, disband, transfer leadership
- Dedicated party chat channel with custom prefix
- Cross-server party persistence
- Auto-transfer leadership when leader leaves (configurable)
- Forms-based interactive UI
- Sound notifications and title popups

### Friend System

- Send and manage friend requests
- Request expiration system (configurable timeout)
- Online/offline status tracking
- Cross-server friend list synchronization
- Maximum friends limit (configurable)
- Accept/deny pending requests
- Remove friends with confirmation
- Private messaging capabilities

### Database Support

- **SQLite** - Default file-based storage (zero configuration)
- **MySQL** - For multi-server networks
- **MariaDB** - Full compatibility
- Automatic fallback to SQLite on connection failure
- Asynchronous database operations
- Optimized queries with connection pooling

### User Interface

- Clean Forms-based UI (SimpleForm, CustomForm, ModalForm)
- Dropdown menus for player selection
- Confirmation dialogs for destructive actions
- Customizable colors and icons
- Bold headings for better readability
- Intuitive navigation system

---

## Installation

1. Download the latest `.phar` file from [Releases](https://github.com/PixelMCN/PartiesAndFriends/releases)
2. Place it in your server's `plugins/` folder
3. Restart your server
4. Configure `plugins/PartiesAndFriends/config.yml` as needed
5. Customize messages in `plugins/PartiesAndFriends/messages.yml`

---

## Commands

### Party Commands

| Command | Description | Permission | Default |
|---------|-------------|------------|---------|
| `/party` or `/p` | Open party menu | `parties.create` | All |
| `/party create` | Create a new party | `parties.create` | All |
| `/party invite <player>` | Invite a player | `parties.invite` | All |
| `/party join <player>` | Join a party | `parties.join` | All |
| `/party leave` | Leave current party | `parties.leave` | All |
| `/party kick <player>` | Kick a member (leader only) | `parties.kick` | All |
| `/party disband` | Disband party (leader only) | `parties.disband` | All |
| `/party chat <message>` | Send party chat message | `parties.chat` | All |
| `/party transfer <player>` | Transfer leadership | `parties.transfer` | All |
| `/party info` | View party information | `parties.info` | All |
| `/party help` | Show help message | `parties.create` | All |

### Friend Commands

| Command | Description | Permission | Default |
|---------|-------------|------------|---------|
| `/friend` or `/f` | Open friends menu | `friends.add` | All |
| `/friend add <player>` | Send friend request | `friends.add` | All |
| `/friend remove <player>` | Remove a friend | `friends.remove` | All |
| `/friend accept <player>` | Accept friend request | `friends.accept` | All |
| `/friend deny <player>` | Deny friend request | `friends.deny` | All |
| `/friend list` | View friends list | `friends.list` | All |
| `/friend help` | Show help message | `friends.add` | All |

### Admin Commands

| Command | Description | Permission | Default |
|---------|-------------|------------|---------|
| `/pf reload` | Reload configuration | `pf.admin.reload` | OP Only |

---

## Configuration

### Basic Configuration (config.yml)

```yaml
# Database Configuration
database:
  type: "sqlite"  # Options: sqlite, mysql, mariadb
  
  mysql:
    host: "localhost"
    port: 3306
    username: "root"
    password: ""
    database: "partiesandfriends"
    pool-size: 2
  
  sqlite:
    file: "partiesandfriends.db"

# Multi-Server Sync
sync:
  enabled: false
  interval: 5
  server-id: "lobby-1"

# Party Settings
party:
  max-members: 8
  disband-on-leader-leave: false
  auto-transfer-leadership: true
  auto-leave-on-quit: false
  chat-prefix: "&6[PARTY] &r"

# Friend Settings
friends:
  max-friends: 50
  request-expiration: 300
  show-status: true

# Notifications
notifications:
  sounds:
    enabled: true
    party-invite: "random.orb"
    friend-request: "random.orb"
  titles:
    enabled: true
    fade-in: 10
    stay: 40
    fade-out: 10
```

### Message Placeholders

Available placeholders for `messages.yml`:

- `{player}` - Player name
- `{party}` - Party name/leader
- `{friend}` - Friend name
- `{maxMembers}` - Maximum party size
- `{count}` - Various counts
- `{leader}` - Party leader name
- `{members}` - Party members list

### Color Codes

Standard Minecraft color codes are supported:
- `&0-9, a-f` - Colors
- `&l` - Bold
- `&o` - Italic
- `&n` - Underline
- `&r` - Reset

---

## Multi-Server Setup

### Prerequisites

- MySQL or MariaDB database server
- Network connectivity between servers
- Same plugin version on all servers

### Step 1: Database Setup

```sql
CREATE DATABASE partiesandfriends CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'pfuser'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON partiesandfriends.* TO 'pfuser'@'%';
FLUSH PRIVILEGES;
```

### Step 2: Configure Each Server

Edit `config.yml` on all servers:

```yaml
database:
  type: "mysql"
  mysql:
    host: "your-db-host"
    port: 3306
    username: "pfuser"
    password: "your_password"
    database: "partiesandfriends"

sync:
  enabled: true
  interval: 5
  server-id: "unique-server-name"  # Must be unique per server
```

### Step 3: Restart Servers

Restart all servers and verify connection in console:
```
[PartiesAndFriends] Database initialized successfully using MYSQL
[PartiesAndFriends] Multi-server sync enabled
```

---

## Developer API

### Events

The plugin provides a complete event system for developers:

```php
use PixelMCN\PartiesAndFriends\event\party\PartyCreateEvent;
use PixelMCN\PartiesAndFriends\event\party\PartyInviteEvent;
use PixelMCN\PartiesAndFriends\event\party\PartyJoinEvent;
use PixelMCN\PartiesAndFriends\event\party\PartyLeaveEvent;
use PixelMCN\PartiesAndFriends\event\party\PartyDisbandEvent;
use PixelMCN\PartiesAndFriends\event\friend\FriendAddEvent;
use PixelMCN\PartiesAndFriends\event\friend\FriendRemoveEvent;

public function onPartyCreate(PartyCreateEvent $event): void {
    $leader = $event->getLeader();
    $party = $event->getParty();
    // Custom logic here
}
```

### API Methods

```php
use PixelMCN\PartiesAndFriends\PartiesAndFriends;

$plugin = PartiesAndFriends::getInstance();

// Party Manager
$partyManager = $plugin->getPartyManager();
$party = $partyManager->getPartyByPlayer("PlayerName");
$hasParty = $partyManager->hasParty("PlayerName");
$members = $party?->getMembers() ?? [];

// Friend Manager
$friendManager = $plugin->getFriendManager();
$friends = $friendManager->getFriends("PlayerName");
$areFriends = $friendManager->areFriends("Player1", "Player2");
$onlineFriends = $friendManager->getOnlineFriends("PlayerName");
```

### Integration Example

Auto-team party members in a minigame:

```php
use PixelMCN\PartiesAndFriends\PartiesAndFriends;
use pocketmine\Server;

public function assignTeams(array $players): void {
    $partyManager = PartiesAndFriends::getInstance()->getPartyManager();
    
    foreach ($players as $player) {
        $party = $partyManager->getPartyByPlayer($player->getName());
        if ($party !== null) {
            foreach ($party->getMembers() as $memberName) {
                $member = Server::getInstance()->getPlayerExact($memberName);
                if ($member !== null) {
                    $this->assignToTeam($member, $party->getLeader());
                }
            }
        }
    }
}
```

---

## Requirements

| Component | Minimum Version | Recommended |
|-----------|----------------|-------------|
| PocketMine-MP | 5.0.0 | Latest 5.x |
| PHP | 8.4 | 8.4+ |
| MySQL* | 5.7 | 8.0+ |
| MariaDB* | 10.2 | 10.5+ |

*MySQL/MariaDB only required for multi-server networks. SQLite works for single servers.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/PixelMCN/PartiesAndFriends/issues)
- **Documentation**: [Wiki](https://github.com/PixelMCN/PartiesAndFriends/wiki)
- **Email**: support@pixelmcn.com

---

## Contributing

Contributions are welcome! Please:
- Report bugs via GitHub Issues
- Submit pull requests for features
- Improve documentation
- Suggest new features

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Version 1.0.0** | **Author: PixelMCN** | **API: 5.0.0**

© 2025 PixelMCN & MazecraftMCN Team. All rights reserved.
