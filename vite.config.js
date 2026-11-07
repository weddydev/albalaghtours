import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // keep long-lived vendor code in its own cacheable chunks
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap') || id.includes('lenis')) return 'motion'
          if (id.includes('react')) return 'react'
        },
      },
    },
  },
})
