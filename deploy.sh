#!/bin/bash

# MazecraftMC GitHub Pages Deployment Script
# This script prepares and deploys the site to GitHub Pages

echo "🚀 Starting MazecraftMC GitHub Pages deployment..."

# Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf dist/
rm -rf node_modules/.vite/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if dist directory exists and has content
    if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
        echo "📁 Build output verified:"
        ls -la dist/
        
        echo ""
        echo "🎉 Ready to deploy!"
        echo ""
        echo "Next steps:"
        echo "1. Commit changes: git add . && git commit -m 'Deploy to GitHub Pages'"
        echo "2. Push to main: git push origin main"
        echo "3. The GitHub Actions workflow will automatically deploy to Pages"
        echo ""
        echo "Or deploy manually:"
        echo "git subtree push --prefix dist origin gh-pages"
    else
        echo "❌ Build directory is empty or missing!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi