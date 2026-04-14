import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// - `vite` / npm run dev → base "/" so the app is at http://localhost:5173/
// - `vite build` on Vercel (VERCEL=1) → "/" for root deploy
// - `vite build` elsewhere → "/wins95Portfolio/" for GitHub Pages
// Override anytime with env VITE_BASE=/custom/path/
function resolveBase(command) {
  if (command === 'serve') {
    return process.env.VITE_BASE ?? '/'
  }
  return (
    process.env.VITE_BASE ??
    (process.env.VERCEL === '1' ? '/' : '/wins95Portfolio/')
  )
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: resolveBase(command),
  build: {
    sourcemap: false,  // Disable sourcemaps
  },
}))
