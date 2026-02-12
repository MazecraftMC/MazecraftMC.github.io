import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/stats-proxy': {
        target: 'http://node.siddz.com:25572',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/stats-proxy/, '/api/kills'),
      },
      '/api/stats': {
        target: 'https://plan.mazecraftmc.fun',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/stats/, '/v1/players'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Set headers to avoid 403
            proxyReq.setHeader('Origin', 'https://plan.mazecraftmc.fun');
            proxyReq.setHeader('Referer', 'https://plan.mazecraftmc.fun/');
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          anime: ['animejs']
        }
      }
    }
  }
})