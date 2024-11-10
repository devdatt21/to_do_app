import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, // Increased limit to accommodate larger chunks
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].split('.')[0];
          }
        }
      }
    },
    minify: 'terser' // Ensures code is minified using terser, the default minifier
  }
})
