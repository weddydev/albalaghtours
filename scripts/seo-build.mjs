/*
 * Runs after `vite build` (see package.json). The app is a single-page app, so every URL used to
 * get the same index.html — the same title and description for Google, and no share preview on
 * WhatsApp / Facebook, which do not run JavaScript. This writes, into dist/:
 *   - one HTML file per indexable route, with that page's <title>, description, canonical URL,
 *     Open Graph / Twitter tags and JSON-LD structured data (the app itself is unchanged);
 *   - sitemap.xml and robots.txt.
 * All values come from src/data/seo.js, the same source the app uses at runtime.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { absolute, fullTitle, indexableRoutes, ogImage, SITE_NAME, SITE_URL } from '../src/data/seo.js'
import { seoFaqs } from '../src/data/seoPages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const text = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

function headBlock(m) {
  const title = fullTitle(m)
  const url = absolute(m.path)
  const img = absolute(m.image ?? ogImage())
  return [
    `<title>${text(title)}</title>`,
    `<meta name="description" content="${attr(m.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${attr(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${attr(title)}" />`,
    `<meta property="og:description" content="${attr(m.description)}" />`,
    `<meta property="og:url" content="${attr(url)}" />`,
    `<meta property="og:image" content="${attr(img)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attr(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(title)}" />`,
    `<meta name="twitter:description" content="${attr(m.description)}" />`,
    `<meta name="twitter:image" content="${attr(img)}" />`,
    `<script type="application/ld+json" id="seo-jsonld">${json(m.jsonLd)}</script>`,
  ].join('\n    ')
}

const template = await readFile(join(dist, 'index.html'), 'utf8')
const BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/
if (!BLOCK.test(template)) throw new Error('index.html is missing the <!--seo--> … <!--/seo--> block')

const routes = indexableRoutes(seoFaqs)
for (const m of routes) {
  const html = template.replace(BLOCK, `<!--seo-->\n    ${headBlock(m)}\n    <!--/seo-->`)
  // "/" → index.html; "/services/visa-services" → services/visa-services.html (served at the clean URL)
  const file = m.path === '/' ? join(dist, 'index.html') : join(dist, `${m.path.slice(1)}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((m) => `  <url>\n    <loc>${text(absolute(m.path))}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${(m.priority ?? 0.7).toFixed(1)}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`seo-build: ${routes.length} pages, sitemap.xml and robots.txt written for ${SITE_URL}`)
