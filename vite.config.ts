import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

const repoName = 'MundialScann26K'

// https://vite.dev/config/
export default defineConfig({
  base: `/${repoName}/`,
  build: {
    outDir: 'dist',
  },
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
