import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // The app lives in frontend/ while the build runs from the repo root, so
  // both the source root and the output path are pinned explicitly.
  root: __dirname,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@ui': path.resolve(__dirname, './src/components/ui')
    }
  },
  server: {
    // Proxy API calls to `vercel dev` so the chatbot works in local dev.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Split large vendors into their own cacheable chunks. three/drei
        // and the Gemini SDK already live in lazy chunks (see App.tsx); this
        // keeps the always-loaded vendor code (react, framer-motion) separate
        // from app code so it caches across deploys.
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },
})
