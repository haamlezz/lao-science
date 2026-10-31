// Replaces references to files in public/ (logo, favicon) with data: URIs inside the single HTML file.
import { readFileSync, writeFileSync, renameSync } from 'node:fs'

const out = 'dist-single/index.html'
const assets = [
  ['./edventure-logo.jpg', 'public/edventure-logo.jpg', 'image/jpeg'],
  ['./favicon.svg', 'public/favicon.svg', 'image/svg+xml'],
]
let html = readFileSync(out, 'utf8')
for (const [ref, file, mime] of assets) {
  const uri = `data:${mime};base64,${readFileSync(file).toString('base64')}`
  html = html.split(ref).join(uri)
}
writeFileSync(out, html)
renameSync(out, 'dist-single/edventure-science.html')
console.log(`wrote dist-single/edventure-science.html (${(html.length / 1e6).toFixed(2)} MB)`)
