import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// One self-contained HTML file (JS + CSS + fonts inlined) for offline hand-out; no PWA / service worker.
// Run: npm run build:single  (output: dist-single/index.html, images inlined by scripts/inline-assets.mjs)
export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-single', emptyOutDir: true, chunkSizeWarningLimit: 20000 },
})
