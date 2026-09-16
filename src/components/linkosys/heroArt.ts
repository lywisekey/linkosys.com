import arch from '@/assets/images/hero/arch.svg'
import secure from '@/assets/images/hero/secure.svg'
import plant from '@/assets/images/hero/plant.svg'
import flow from '@/assets/images/hero/flow.svg'
import signal from '@/assets/images/hero/signal.svg'

/**
 * Hero artwork, drawn in `scripts/generate-hero-art.py`.
 *
 * arch   — system architecture, for engineering and company pages
 * secure — layered controls, for government
 * plant  — isometric production line, for manufacturing and delivered work
 * flow   — sources converging on one governed output, for data and solutions
 * signal — a measured trace, for evidence, results and contact
 */
export const heroArt = { arch, secure, plant, flow, signal }

export type HeroArt = keyof typeof heroArt
