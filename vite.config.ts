import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), Pages()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
