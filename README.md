# 🎮 Mazecraft - GitBook Style Static Website

A beautiful, responsive static website for the Mazecraft Minecraft server, built with pure **HTML**, **CSS**, and **Vanilla JavaScript** featuring smooth **Anime.js** animations.

![Mazecraft Banner](./resources/images/mazecraft.png)

## ✨ Features

- 🎨 **GitBook-inspired Design** - Clean, modern, professional layout
- 🌙 **Dark Theme** - Black background with orange/yellow accents
- ✨ **Anime.js Animations** - Smooth scroll reveals, transitions, and hover effects
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Performance Optimized** - Lazy loading images, smooth animations
- ♿ **Accessible** - ARIA labels, keyboard navigation, semantic HTML
- 🎯 **SEO Ready** - Meta tags, Open Graph, Twitter Cards
- 🔍 **No Frameworks** - Pure vanilla JavaScript (except Anime.js for animations)

## 📂 Project Structure

```
mazecraftmc/
├── index.html              # Home page
├── pages/
│   ├── store.html         # Store with sidebar navigation
│   ├── maps.html          # Interactive maps page
│   ├── projects.html      # GitHub/Modrinth projects
│   ├── forums.html        # Coming soon page
│   └── docs.html          # Plugin documentation
├── css/
│   ├── global.css         # Design system & components
│   ├── home.css           # Home page styles
│   ├── store.css          # Store page styles
│   └── pages.css          # Other pages styles
├── js/
│   └── main.js            # All JavaScript & Anime.js animations
├── resources/
│   └── images/            # All images and icons
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Primary Black**: `#000000` - Background
- **Orange**: `#FF2200` - Buttons, highlights, links
- **Yellow**: `#D9FF00` - Hover glows, accents
- **White**: `#FFFFFF` - Text, contrast

### Typography
- **Font**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Animations
All animations powered by **Anime.js v3.2.1**:
- Fade in on scroll
- Slide in from left/right
- Scale in effects
- Smooth hover transitions
- Page load animations

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mazecraftmc.git
   cd mazecraftmc
   ```

2. **Open with a local server**
   
   Option A - Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   Option B - Using Node.js:
   ```bash
   npx serve
   ```
   
   Option C - Using VS Code:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Visit in browser**
   ```
   http://localhost:8000
   ```

## 🌐 GitHub Pages Deployment

### Method 1: Using GitHub Web Interface

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mazecraftmc.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://yourusername.github.io/mazecraftmc/`

### Method 2: Using GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 📝 Customization Guide

### Update Server Information

**Server IP** (`index.html` line 81):
```html
<span class="hero-ip-text">play.mazecraftmc.fun</span>
<button class="copy-btn" data-copy="play.mazecraftmc.fun">Copy</button>
```

**Discord Widget** (`index.html` line 237):
```html
<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark"></iframe>
```

### Update Social Links

Edit footer in all HTML files:
```html
<a href="https://discord.gg/yourserver">Discord</a>
<a href="https://bsky.app/profile/yourprofile">Bluesky</a>
<a href="https://youtube.com/@yourchannel">YouTube</a>
<a href="https://github.com/yourorg">GitHub</a>
```

### Customize Colors

Edit `css/global.css` (lines 11-14):
```css
:root {
  --color-black: #000000;
  --color-orange: #FF2200;
  --color-yellow: #D9FF00;
  --color-white: #FFFFFF;
}
```

### Add Team Members

Edit `index.html` team section (starting line 124):
```html
<div class="team-card scale-in">
  <div class="team-avatar">
    <img src="./resources/images/team.png" alt="Player Avatar">
  </div>
  <h3 class="team-name">YourName</h3>
  <p class="team-role">Your Role</p>
  <div class="team-socials">
    <!-- Add social links -->
  </div>
</div>
```

### Update Store Products

Edit `pages/store.html` products grid (starting line 125):
```html
<div class="product-card scale-in" data-category="ranks">
  <div class="product-image">
    <span class="product-badge">Popular</span>
  </div>
  <div class="product-info">
    <h3 class="product-title">Product Name</h3>
    <p class="product-description">Description here</p>
    <div class="product-price">$9.99</div>
    <div class="product-actions">
      <button class="product-btn btn-buy">Buy Now</button>
      <button class="product-btn btn-details">Details</button>
    </div>
  </div>
</div>
```

## 🎯 Page Descriptions

### 🏠 Home Page (`index.html`)
- **Hero Section**: Background image with logo and server IP
- **About Section**: Two alternating info blocks with images
- **Team Section**: 6 responsive team member cards
- **Community Section**: Discord widget + call-to-action

### 🛒 Store Page (`pages/store.html`)
- **Sidebar Navigation**: Collapsible categories
- **Search & Filter**: Real-time product filtering
- **Product Grid**: Responsive cards with badges
- **Mobile**: Floating sidebar toggle button

### 🗺️ Maps Page (`pages/maps.html`)
- **Sidebar List**: 6 map categories
- **Viewer Area**: Placeholder for interactive map
- **Coming Soon**: Development message

### 💻 Projects Page (`pages/projects.html`)
- **GitHub Section**: Repository cards with stats
- **Modrinth Section**: Mod showcase
- **CurseForge Section**: Coming soon placeholder

### 💬 Forums Page (`pages/forums.html`)
- **Centered Layout**: "Coming Soon ;)" message
- **Animated Icon**: Floating animation
- **Call-to-Action**: Back to home button

### 📘 Docs Page (`pages/docs.html`)
- **PocketMine Plugins**: 4 plugin cards
- **Paper Plugins**: Coming soon section
- **Click Interaction**: Modal on card click

## 🔧 Technical Features

- ✅ **CSS Variables** - Easy theming and customization
- ✅ **Flexbox & Grid** - Modern, responsive layouts
- ✅ **Intersection Observer** - Scroll-triggered animations
- ✅ **Lazy Loading** - Optimized image loading
- ✅ **Copy to Clipboard** - Server IP copy functionality
- ✅ **Smooth Scroll** - Enhanced navigation
- ✅ **Mobile Menu** - Hamburger navigation
- ✅ **SVG Icons** - Scalable, crisp graphics
- ✅ **Preloader** - Loading screen with animation

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Dependencies

- **Anime.js v3.2.1** - Animation library (loaded from CDN)
- **Google Fonts** - Outfit font family (loaded from CDN)

No build tools or package managers required!

## 🎨 Asset Guidelines

### Images
- **Logo**: `resources/images/mazecraft.png` (transparent PNG, ~400px wide)
- **Backgrounds**: `resources/images/background*.webp` (WebP format, ~1920x1080)
- **Icons**: `resources/images/*.svg` (SVG format)
- **Team Avatars**: `resources/images/team.png` (square, ~256x256)

### Optimization Tips
- Use **WebP** for backgrounds (better compression)
- Use **SVG** for icons and logos
- Compress images with tools like TinyPNG
- Use lazy loading for all images

## 🐛 Common Issues

**Issue**: Animations not working
- **Fix**: Ensure Anime.js CDN is loaded properly
- Check browser console for errors

**Issue**: Images not loading on GitHub Pages
- **Fix**: Use relative paths (e.g., `./resources/images/`)
- Check file names are case-sensitive

**Issue**: Mobile menu not working
- **Fix**: Verify JavaScript is enabled
- Check navbar toggle button exists

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- **Design Inspiration**: GitBook documentation style
- **Animations**: [Anime.js](https://animejs.com/)
- **Icons**: Custom SVG icons
- **Font**: [Outfit](https://fonts.google.com/specimen/Outfit) by Google Fonts

## 📞 Support

- **Discord**: [Join our server](https://discord.gg/yourserver)
- **Email**: support@mazecraftmc.fun
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/mazecraftmc/issues)

---

<div align="center">

**Made with ❤️ for the Mazecraft Community**

[Live Demo](https://yourusername.github.io/mazecraftmc/) • [Report Bug](https://github.com/yourusername/mazecraftmc/issues) • [Request Feature](https://github.com/yourusername/mazecraftmc/issues)

</div>
