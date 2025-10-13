# MazeShop

**Advanced Shop & Auction System for PocketMine-MP**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/PixelMCN/MazeShop/releases)
[![PocketMine-MP](https://img.shields.io/badge/PocketMine--MP-5.0.0+-orange.svg)](https://github.com/pmmp/PocketMine-MP)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

MazeShop is a powerful and flexible shop plugin for PocketMine-MP servers, featuring a multi-level category system, native Bedrock UI, and an integrated auction house. Built with performance and ease-of-use in mind.

---

## Features

### Shop System
- **Multi-level Categories** - Organize items with Category → Subcategory → Items structure
- **Native Bedrock UI** - ChestUI/InvMenu interface with smooth navigation
- **Buy & Sell** - Players can purchase items from the shop or sell their items back
- **Quick Commands** - Direct category access with `/shop <category>` and quick sell with `/sell`
- **YAML Configuration** - Easy-to-edit shop.yml with 188+ pre-configured items
- **Custom Block Support** - Full compatibility with custom blocks from other plugins

### Auction House
- **Player-to-Player Trading** - Create auctions with configurable duration and starting bids
- **Real-time Bidding** - Automatic bid tracking with instant notifications
- **Auto-refund System** - Outbid players receive their money back automatically
- **Auction Management** - Admin commands to remove or force-end auctions
- **Flexible Configuration** - Set fees, limits, and duration constraints
- **Optional System** - Can be completely disabled if not needed

### Economy Integration
- **Auto-detection** - Automatically detects MazePay or BedrockEconomy
- **Seamless Integration** - No balance storage, all handled by economy plugins
- **Customizable Currency** - Configure symbol and name in config.yml

### Customization
- **Messages** - Full message customization with placeholder support
- **Configuration** - Extensive config.yml options for all features
- **Permissions** - Fine-grained permission control for all commands
- **Hot Reload** - Reload configurations without server restart

---

## Requirements

- **PocketMine-MP** 5.0.0 or higher
- **InvMenu** (included in plugin)
- **Economy Plugin** (required):
  - [MazePay](https://github.com/PixelMCN/MazePay) or
  - [BedrockEconomy](https://github.com/cooldogedev/BedrockEconomy)

---

## Installation

1. Download the latest release from [Releases](https://github.com/PixelMCN/MazeShop/releases)
2. Place `MazeShop.phar` in your server's `plugins` folder
3. Install either MazePay or BedrockEconomy
4. Restart your server
5. Configure `config.yml`, `shop.yml`, and `messages.yml` as needed

---

## Configuration

### config.yml
```yaml
# Currency Settings
currency:
  symbol: "$"
  name: "Money"

# Shop Settings
shop:
  items-per-page: 45
  allow-custom-blocks: true

# Auction Settings
auction:
  enabled: true              # Set to false to disable auction system
  min-duration: 300          # 5 minutes
  max-duration: 86400        # 24 hours
  min-starting-bid: 1
  auction-fee: 5             # 5% fee
  max-auctions-per-player: 5
```

### shop.yml
```yaml
categories:
  Wood:
    display-name: "§l§6Wood & Logs"
    icon: minecraft:oak_log
    subcategories:
      oak:
        display-name: "§l§eOak Wood"
        icon: minecraft:oak_planks
        items:
          - id: minecraft:oak_log
            name: "§l§fOak Log"
            buy-price: 10
            sell-price: 5
            amount: 1
            lore:
              - "§aBuy: §f$10 §7| §cSell: §f$5"
```

### messages.yml
Customize all player-facing messages with placeholder support.

---

## Commands

### Player Commands
| Command | Description | Permission |
|---------|-------------|------------|
| `/shop` | Open the shop menu | `mazeshop.use` |
| `/shop <category>` | Open specific category | `mazeshop.use` |
| `/shop reload` | Reload configurations | `mazeshop.admin` |
| `/shop help` | Show help menu | `mazeshop.use` |
| `/sell [amount\|all]` | Quick sell items | `mazeshop.use` |

### Auction Commands (if enabled)
| Command | Description | Permission |
|---------|-------------|------------|
| `/auction` | Open auction house | `mazeshop.auction.use` |
| `/auction list` | List active auctions | `mazeshop.auction.use` |
| `/auction create <bid> <duration>` | Create auction | `mazeshop.auction.use` |
| `/auction bid <id> <amount>` | Place a bid | `mazeshop.auction.use` |
| `/auction view <id>` | View auction details | `mazeshop.auction.use` |

### Admin Commands
| Command | Description | Permission |
|---------|-------------|------------|
| `/shopadmin addcategory <name>` | Add category | `mazeshop.admin` |
| `/shopadmin removecategory <name>` | Remove category | `mazeshop.admin` |
| `/shopadmin addsubcategory <cat> <name>` | Add subcategory | `mazeshop.admin` |
| `/shopadmin removesubcategory <cat> <name>` | Remove subcategory | `mazeshop.admin` |
| `/shopadmin additem <cat> <sub> <price>` | Add item (hold in hand) | `mazeshop.admin` |
| `/shopadmin removeitem <cat> <sub> <item>` | Remove item | `mazeshop.admin` |
| `/auctionadmin remove <id>` | Cancel auction | `mazeshop.auction.admin` |
| `/auctionadmin end <id>` | Force end auction | `mazeshop.auction.admin` |

---

## Permissions

| Permission | Default | Description |
|------------|---------|-------------|
| `mazeshop.use` | `true` | Access shop and sell commands |
| `mazeshop.admin` | `op` | Access admin commands |
| `mazeshop.auction.use` | `true` | Access auction system |
| `mazeshop.auction.admin` | `op` | Manage auctions |

---

## API Usage

### Events
```php
use PixelMCN\MazeShop\event\ItemPurchaseEvent;
use PixelMCN\MazeShop\event\ItemSellEvent;
use PixelMCN\MazeShop\event\AuctionCreateEvent;
use PixelMCN\MazeShop\event\AuctionBidEvent;
use PixelMCN\MazeShop\event\AuctionEndEvent;

public function onPurchase(ItemPurchaseEvent $event): void {
    $player = $event->getPlayer();
    $item = $event->getItem();
    // Modify price, cancel event, etc.
}
```

### Accessing Managers
```php
use PixelMCN\MazeShop\Main;

$mazeShop = Main::getInstance();
$shopLoader = $mazeShop->getShopLoader();
$auctionManager = $mazeShop->getAuctionManager(); // Returns null if disabled
$economyManager = $mazeShop->getEconomyManager();
```

---

## Support

- **Issues**: [GitHub Issues](https://github.com/PixelMCN/MazeShop/issues)
- **Discord**: [Join our Discord](https://discord.gg/pixelmcn)
- **Website**: [mazecraftmc.fun](https://mazecraftmc.fun)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Credits

**Developed by PixelMCN & MazecraftMCN Team**

If you find this plugin useful:
- Star this repository
- Report bugs and suggest features
- Share with other server owners

---

**Thank you for using MazeShop!**
