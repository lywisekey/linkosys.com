/**
 * Generates the Open Graph share images in public/images/og-*.png.
 *
 * These are committed assets, not a build step: they change only when the
 * wording or brand does. Rendered through the gstack browse daemon, which is
 * already the one headless Chromium on the machine.
 *
 * Run: node scripts/generate-og-images.mjs   (writes HTML, then prints the
 * browse commands to render each one)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'node_modules/.cache/og')
mkdirSync(outDir, { recursive: true })

const logo = readFileSync(join(root, 'public/images/logo-light.svg')).toString('base64')

/** One card per section, so a shared link says which part of the site it is. */
export const cards = [
  {
    name: 'og-default',
    eyebrow: 'Technology consulting &amp; engineering',
    heading: 'Technology that solves business problems.',
    sub: 'Software engineering, AI and data, cloud, cybersecurity, IT staffing and program management for government and enterprise.'
  },
  {
    name: 'og-government',
    eyebrow: 'Government',
    heading: 'Technology Solutions for Government',
    sub: 'Software engineering, data, cloud, cybersecurity, staffing and program management for agencies and prime contractors.'
  },
  {
    name: 'og-manufacturing',
    eyebrow: 'Manufacturing',
    heading: 'Your factory. Connected.',
    sub: 'MES, production visibility, machine integration and IT/OT convergence for manufacturers.'
  },
  {
    name: 'og-services',
    eyebrow: 'Services',
    heading: 'Six practices, end to end.',
    sub: 'Software development, AI and data, cloud and infrastructure, cybersecurity, IT staffing, program management.'
  }
]

const page = (card) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0a1928;font-family:'Instrument Sans',sans-serif;overflow:hidden}
  .card{position:relative;width:1200px;height:630px;padding:76px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .card::before{content:'';position:absolute;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);
    background-size:72px 72px;
    -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 0%,#000 40%,transparent 100%)}
  .inner{position:relative;z-index:1}
  img{height:52px}
  .eyebrow{display:flex;align-items:center;gap:14px;margin:38px 0 22px;color:#f05a49;font-size:17px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
  .eyebrow::before{content:'';width:34px;height:3px;background:#f05a49}
  h1{color:#fff;font-size:62px;line-height:1.07;letter-spacing:-.025em;font-weight:700;max-width:960px}
  p{color:#a9bdd1;font-size:24px;line-height:1.5;margin-top:24px;max-width:900px}
  .foot{position:relative;z-index:1;display:flex;gap:16px;align-items:center;color:#8da4bb;font-size:18px;font-weight:600;letter-spacing:.04em}
  .dot{width:5px;height:5px;border-radius:50%;background:#f05a49}
</style></head><body>
<div class="card">
  <div class="inner">
    <img src="data:image/svg+xml;base64,${logo}" alt="">
    <div class="eyebrow">${card.eyebrow}</div>
    <h1>${card.heading}</h1>
    <p>${card.sub}</p>
  </div>
  <div class="foot"><span>GSA MAS 47QTCA21D004X</span><span class="dot"></span><span>CALIFORNIA CMAS</span><span class="dot"></span><span>LINKOSYS.COM</span></div>
</div></body></html>`

for (const card of cards) {
  writeFileSync(join(outDir, `${card.name}.html`), page(card))
}

console.log(`wrote ${cards.length} templates to ${outDir}`)
console.log(cards.map((c) => `${c.name}.html -> public/images/${c.name}.png`).join('\n'))
