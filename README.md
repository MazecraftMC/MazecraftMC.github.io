# MazecraftMC Network Website

A modern, responsive static website for the MazecraftMC Minecraft server network built with HTML, CSS, and JavaScript.

## Features

- **Modern Design**: Black, pastel orange, and white color scheme with sleek animations
- **Fully Responsive**: Adapts perfectly to desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by anime.js for beautiful scroll and hover effects
- **Mobile-Friendly**: Hamburger menu for mobile navigation
- **Server Status Display**: Real-time server information on the homepage
- **Team Section**: Meet the server staff with contact information
- **Social Integration**: Links to Discord, YouTube, and Bluesky

## Structure

```
├── index.html          # Main homepage
├── styles.css          # All CSS styles
├── scripts.js          # JavaScript functionality
├── pages/              # Secondary pages
│   ├── store.html     # Store page (coming soon)
│   ├── map.html       # Server map page (coming soon)
│   ├── downloads.html # Downloads page (coming soon)
│   └── docs.html      # Documentation page (coming soon)
└── resources/
    └── images/         # Website images and icons
```

## Setup

1. Clone or download this repository
2. Add your Minecraft server images to `resources/images/`:
   - `minecraft-landscape.webp` - Hero background image
   - `survival-world.webp` - Survival gamemode image
   - `coming-soon.webp` - Coming soon gamemode image
   - Social media icons (already included)
3. Update server information in `index.html`:
   - Server IP address
   - Player count
   - Team member information
4. Customize Discord/social media links
5. Open `index.html` in a web browser or deploy to your web server

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality
- **anime.js**: Smooth animations and transitions
- **Google Fonts**: Merriweather font family

## Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Customization

The website uses CSS custom properties (variables) for easy color customization. Modify the `:root` section in `styles.css`:

```css
:root {
    --primary-black: #1a1a1a;
    --secondary-black: #2d2d2d;
    --pastel-orange: #ffb366;
    --bright-orange: #ff9a3d;
    --pure-white: #ffffff;
    --golden-border: #ffd700;
}
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

© 2024 MazecraftMC Network. All rights reserved.