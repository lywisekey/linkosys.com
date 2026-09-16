#!/usr/bin/env python3
"""
Generates the hero background artwork in src/assets/images/hero/.

Drawn rather than sourced: stock "plexus" and lightbulb imagery was off-palette
and generic, and the homepage previously carried a 43MB video for the same job.
Each file is a few KB of SVG in the site's own navy and brand red, masked so the
artwork sits to the right of the text column and never competes with the copy.

Run: python3 scripts/generate-hero-art.py
"""
import math
import pathlib
import random

OUT = pathlib.Path(__file__).resolve().parent.parent / 'src/assets/images/hero'
W, H = 1440, 620

LINE = 'rgba(255,255,255,0.13)'
LINE_SOFT = 'rgba(255,255,255,0.07)'
DOT = 'rgba(255,255,255,0.28)'
ACC = 'rgba(240,90,73,0.42)'


def wrap(body: str, name: str) -> str:
    # SVG masks are luminance-based, so the fade needs white stops; black stops
    # hide everything regardless of their opacity.
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" fill="none" role="presentation">
  <defs>
    <linearGradient id="fade-{name}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.54" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.72" stop-color="#fff" stop-opacity="0.55"/>
      <stop offset="0.88" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="mask-{name}"><rect width="{W}" height="{H}" fill="url(#fade-{name})"/></mask>
  </defs>
  <g mask="url(#mask-{name})">
{body}
  </g>
</svg>
'''


def grid(step: int = 72, op: str = LINE_SOFT) -> str:
    p = [f'    <path d="M{x} 0V{H}" stroke="{op}" stroke-width="1"/>' for x in range(0, W + 1, step)]
    p += [f'    <path d="M0 {y}H{W}" stroke="{op}" stroke-width="1"/>' for y in range(0, H + 1, step)]
    return '\n'.join(p)


def arch() -> str:
    """Service blocks with orthogonal routing — a system architecture sketch."""
    p = [grid()]
    blocks = [(880, 110, 150, 74), (1076, 86, 132, 64), (1258, 150, 150, 74),
              (930, 286, 168, 80), (1152, 262, 150, 74), (1286, 380, 132, 64),
              (886, 452, 150, 70), (1090, 442, 168, 78)]
    for (x, y, w, h) in blocks:
        p.append(f'    <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" stroke="{LINE}" stroke-width="1.25"/>')
        p.append(f'    <path d="M{x + 12} {y + h - 14}h{int(w * 0.42)}" stroke="{LINE}" stroke-width="1"/>')
        p.append(f'    <path d="M{x + 12} {y + h - 24}h{int(w * 0.26)}" stroke="{LINE_SOFT}" stroke-width="1"/>')
    links = [(1030, 147, 1076, 118), (1208, 118, 1258, 187), (1014, 326, 1152, 299),
             (1098, 326, 1286, 412), (1036, 487, 1090, 481), (1258, 481, 1286, 444)]
    for (x1, y1, x2, y2) in links:
        mx = (x1 + x2) // 2
        p.append(f'    <path d="M{x1} {y1}H{mx}V{y2}H{x2}" stroke="{LINE}" stroke-width="1"/>')
        p.append(f'    <circle cx="{x1}" cy="{y1}" r="2.5" fill="{DOT}"/>')
    p.append(f'    <path d="M930 326H1014V299H1152" stroke="{ACC}" stroke-width="1.5"/>')
    p.append(f'    <circle cx="1152" cy="299" r="3.5" fill="{ACC}"/>')
    return wrap('\n'.join(p), 'arch')


def secure() -> str:
    """Concentric control layers around a protected core — defence in depth."""
    p = [grid()]
    cx, cy = 1210, 310
    for i, r in enumerate([80, 128, 176, 224, 272]):
        dash = '' if i % 2 == 0 else ' stroke-dasharray="5 7"'
        p.append(f'    <circle cx="{cx}" cy="{cy}" r="{r}" stroke="{LINE}" stroke-width="1.1"{dash}/>')
    for a in range(0, 360, 30):
        rad = math.radians(a)
        x1, y1 = cx + 80 * math.cos(rad), cy + 80 * math.sin(rad)
        x2, y2 = cx + 272 * math.cos(rad), cy + 272 * math.sin(rad)
        p.append(f'    <path d="M{x1:.0f} {y1:.0f}L{x2:.0f} {y2:.0f}" stroke="{LINE_SOFT}" stroke-width="1"/>')
    for a in range(15, 360, 60):
        rad = math.radians(a)
        x, y = cx + 176 * math.cos(rad), cy + 176 * math.sin(rad)
        p.append(f'    <circle cx="{x:.0f}" cy="{y:.0f}" r="3" fill="{DOT}"/>')
    # A concentric core, not a tick: a checkmark is the most worn security cliché
    # and says "approved" rather than "layered control".
    p.append(f'    <circle cx="{cx}" cy="{cy}" r="80" stroke="{ACC}" stroke-width="1.6"/>')
    p.append(f'    <circle cx="{cx}" cy="{cy}" r="44" stroke="{ACC}" stroke-width="1.2"/>')
    p.append(f'    <rect x="{cx - 17}" y="{cy - 17}" width="34" height="34" rx="2" stroke="{ACC}" stroke-width="1.6" transform="rotate(45 {cx} {cy})"/>')
    return wrap('\n'.join(p), 'secure')


def plant() -> str:
    """Isometric production line with stations — the shop floor, abstracted."""
    p = [grid()]

    def iso(x, y, z=0):
        return (x * 0.866 - y * 0.866 + 1140, x * 0.5 + y * 0.5 - z + 210)

    for i in range(7):
        a, b = iso(i * 84, 0), iso(i * 84, 300)
        p.append(f'    <path d="M{a[0]:.0f} {a[1]:.0f}L{b[0]:.0f} {b[1]:.0f}" stroke="{LINE_SOFT}" stroke-width="1"/>')
    for j in range(5):
        a, b = iso(0, j * 75), iso(504, j * 75)
        p.append(f'    <path d="M{a[0]:.0f} {a[1]:.0f}L{b[0]:.0f} {b[1]:.0f}" stroke="{LINE_SOFT}" stroke-width="1"/>')
    for i, xx in enumerate([84, 210, 336]):
        bx, by = iso(xx, 150)
        h = 46 + (i % 2) * 18
        p.append(f'    <path d="M{bx:.0f} {by:.0f}l31 18v{h}l-31 -18z" stroke="{LINE}" stroke-width="1.2"/>')
        p.append(f'    <path d="M{bx + 31:.0f} {by + 18:.0f}l31 -18v{h}l-31 18z" stroke="{LINE}" stroke-width="1.2"/>')
        p.append(f'    <path d="M{bx:.0f} {by:.0f}l31 18 31 -18-31 -18z" stroke="{LINE}" stroke-width="1.2"/>')
    a, b = iso(42, 150), iso(420, 150)
    p.append(f'    <path d="M{a[0]:.0f} {a[1]:.0f}L{b[0]:.0f} {b[1]:.0f}" stroke="{ACC}" stroke-width="1.6"/>')
    for xx in (126, 252):
        c = iso(xx, 150)
        p.append(f'    <circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="3.5" fill="{ACC}"/>')
    return wrap('\n'.join(p), 'plant')


def flow() -> str:
    """Scattered sources converging into one governed output."""
    p = [grid()]
    for i, y in enumerate([110, 190, 270, 350, 430, 510]):
        p.append(f'    <path d="M860 {y}H1060C1120 {y} 1140 310 1200 310H1400" stroke="{LINE if i % 2 == 0 else LINE_SOFT}" stroke-width="1.15"/>')
        p.append(f'    <circle cx="880" cy="{y}" r="3" fill="{DOT}"/>')
    p.append(f'    <path d="M860 310H1060C1120 310 1140 310 1200 310H1400" stroke="{ACC}" stroke-width="1.7"/>')
    p.append(f'    <rect x="1200" y="272" width="76" height="76" rx="3" stroke="{LINE}" stroke-width="1.3"/>')
    p.append(f'    <circle cx="1238" cy="310" r="5" fill="{ACC}"/>')
    for x in (1320, 1370):
        p.append(f'    <path d="M{x} 286v48" stroke="{LINE_SOFT}" stroke-width="1"/>')
    return wrap('\n'.join(p), 'flow')


def signal() -> str:
    """A measured trace with sampled points — telemetry, not decoration."""
    p = [grid(step=60)]
    random.seed(7)
    pts = []
    for i in range(25):
        x = 880 + i * 24
        amp = 58 if i % 4 else 96
        y = 310 - math.sin(i * 0.55) * amp * (0.35 + i / 50)
        pts.append((x, y))
    d = 'M' + ' L'.join(f'{x:.0f} {y:.0f}' for x, y in pts)
    p.append(f'    <path d="{d}" stroke="{LINE}" stroke-width="1.3"/>')
    p.append(f'    <path d="M880 310H1440" stroke="{LINE_SOFT}" stroke-width="1"/>')
    for i in (7, 14, 21):
        x, y = pts[i]
        p.append(f'    <circle cx="{x:.0f}" cy="{y:.0f}" r="3.5" fill="{ACC}"/>')
        p.append(f'    <path d="M{x:.0f} {y:.0f}V310" stroke="{ACC}" stroke-width="1" stroke-dasharray="3 4"/>')
    return wrap('\n'.join(p), 'signal')


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in (('arch', arch), ('secure', secure), ('plant', plant), ('flow', flow), ('signal', signal)):
        svg = fn()
        (OUT / f'{name}.svg').write_text(svg)
        print(f'{name}.svg  {len(svg):,} bytes')
