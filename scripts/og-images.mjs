/*
 * Generates the share-preview images (1200×630 JPG) shown when a page is posted on WhatsApp,
 * Facebook, LinkedIn or X — one per page, from the site's own photos — plus the logo PNG used in
 * the structured data and the iOS home-screen icon. Run after changing pages or photos:
 *   npm run og-images
 * Output goes to /public (committed), so the normal build does not depend on this script.
 */
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { albania, contact, services } from '../src/data/content.js'
import { seoLinks } from '../src/data/seo.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const outDir = join(pub, 'og')
const W = 1200
const H = 630

/* key → [photo in /public, headline] */
const CARDS = {
  home: ['/images/destinations/dubai.webp', 'Holidays, Visas, Hajj & Umrah from Hyderabad'],
  packages: ['/images/services/holiday.webp', 'Holiday, Hajj & Umrah Packages'],
  destinations: ['/images/destinations/europe.webp', 'Top Destinations from Hyderabad'],
  hotels: ['/images/madinah.webp', 'Umrah Hotels in Makkah & Madinah'],
  contact: ['/images/services/air.webp', 'Visit Us in Mehdipatnam, Hyderabad'],
  'albania-work-visa': ['/images/albania/tirana.webp', albania.meta.title.split(' — ')[0]],
  ...Object.fromEntries(services.filter((s) => !s.path).map((s) => [s.slug, [s.image, s.title]])),
  ...Object.fromEntries(seoLinks.map((p) => [p.slug, [p.image, p.label.replace(/^./, (c) => c.toUpperCase())]])),
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Greedy word wrap to at most `max` characters per line. */
function wrap(textLine, max) {
  const lines = []
  let line = ''
  for (const word of textLine.split(' ')) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line)
      line = word
    } else line = line ? `${line} ${word}` : word
  }
  if (line) lines.push(line)
  return lines
}

function overlay(title) {
  const size = title.length > 34 ? 68 : 78
  const lines = wrap(title, title.length > 34 ? 22 : 18).slice(0, 3)
  const lh = size * 1.08
  const top = H / 2 - ((lines.length - 1) * lh) / 2 + size * 0.32
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#17110d" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#17110d" stop-opacity="0.78"/>
      <stop offset="1" stop-color="#17110d" stop-opacity="0.15"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#f6e4bf"/><stop offset="1" stop-color="#c8963e"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" x2="1">
      <stop offset="0" stop-color="#d9a84e"/><stop offset="1" stop-color="#d9a84e" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="18" fill="none" stroke="#c8963e" stroke-opacity="0.45" stroke-width="1.5"/>
  <text x="80" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="5" fill="#d9a84e">AL BALAAGH TRAVELS · HYDERABAD</text>
  <rect x="80" y="140" width="260" height="2" fill="url(#rule)"/>
  ${lines
    .map((l, i) => `<text x="76" y="${(top + i * lh).toFixed(0)}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700" fill="${i === lines.length - 1 ? 'url(#gold)' : '#f8f1e4'}">${esc(l)}</text>`)
    .join('\n  ')}
  <text x="80" y="${H - 78}" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#e6d6ba">Mehdipatnam, Hyderabad  ·  ${esc(contact.phones[0].label)}</text>
</svg>`)
}

await mkdir(outDir, { recursive: true })
for (const [key, [photo, title]] of Object.entries(CARDS)) {
  const base = await sharp(join(pub, photo))
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.9 })
    .toBuffer()
  await sharp(base)
    .composite([{ input: overlay(title) }])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(join(outDir, `${key}.jpg`))
}

// logo (structured data) and iOS home-screen icon, from the favicon
const icon = join(pub, 'favicon.svg')
await sharp(icon, { density: 900 }).resize(512, 512).png().toFile(join(outDir, 'logo.png'))
await sharp(icon, { density: 400 }).resize(180, 180).flatten({ background: '#1f1510' }).png().toFile(join(pub, 'apple-touch-icon.png'))

console.log(`og-images: ${Object.keys(CARDS).length} share images, logo.png and apple-touch-icon.png written`)
