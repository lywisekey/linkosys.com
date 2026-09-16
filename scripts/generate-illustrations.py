#!/usr/bin/env python3
"""
Generates the isometric card illustrations in src/assets/images/illus/.

Line art in the site's own palette: light structure strokes, white faces, and
exactly one brand-red element per scene so the eye lands somewhere deliberate.
Each file carries a small looping animation, disabled under
prefers-reduced-motion by a media query inside the SVG.

Run: python3 scripts/generate-illustrations.py
"""
import math
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / 'src/assets/images/illus'
W, H = 480, 300

STROKE = '#c3cedd'          # structure
STROKE_SOFT = '#dde4ed'     # guides
FACE_T = '#ffffff'          # top face
FACE_L = '#f5f8fb'          # left face
FACE_R = '#eaeff6'          # right face
ACCENT = '#ea3324'
ACCENT_FACE = '#fde8e6'
# Accent text needs a darker tone than the accent stroke to stay legible on the
# pale panel these sit in.
ACCENT_INK = '#b3231a'
INK = '#8497ad'

COS30 = math.cos(math.radians(30))


# Mutable framing, set per scene before drawing.
VIEW = {'scale': 1.18, 'ox': 240, 'oy': 150}

# Screen-space points touched while drawing, used to auto-fit the viewBox.
PTS: list = []


def iso(x, y, z=0):
    """Isometric projection: x runs right-down, y left-down, z up."""
    k = VIEW['scale']
    x, y, z = x * k, y * k, z * k
    pt = (VIEW['ox'] + (x - y) * COS30, VIEW['oy'] + (x + y) * 0.5 - z)
    PTS.append(pt)
    return pt


def box(x, y, z, w, d, h, stroke=STROKE, accent=False, sw=1.2):
    """A cuboid drawn as three visible faces."""
    ft, fl, fr = (ACCENT_FACE, ACCENT_FACE, '#f9d9d5') if accent else (FACE_T, FACE_L, FACE_R)
    st = ACCENT if accent else stroke
    t = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)]
    l = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)]
    r = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)]

    def poly(pts, fill):
        d_ = ' '.join(f'{p[0]:.1f},{p[1]:.1f}' for p in pts)
        return f'<polygon points="{d_}" fill="{fill}" stroke="{st}" stroke-width="{sw}" stroke-linejoin="round"/>'

    return poly(l, fl) + poly(r, fr) + poly(t, ft)


def plate(x, y, z, w, d, stroke=STROKE_SOFT, dash=''):
    """A flat outline on the ground plane — a ghost or guide."""
    pts = [iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)]
    d_ = ' '.join(f'{p[0]:.1f},{p[1]:.1f}' for p in pts)
    da = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<polygon points="{d_}" fill="none" stroke="{stroke}" stroke-width="1"{da}/>'


def label(x, y, z, text, size=13, fill=INK, anchor='middle', axis='x', weight='600'):
    """
    A caption sitting in the scene.

    Rotated to follow an isometric axis but not sheared: a full isometric matrix
    distorts glyphs badly enough to hurt reading at card size, and the reference
    drawings rotate their labels rather than projecting them.
    """
    px, py = iso(x, y, z)
    half = len(text) * size * 0.36
    reach = half * 0.5 + size
    PTS.extend([(px - half, py - reach), (px + half, py + reach)])
    angle = 30 if axis == 'x' else -30
    return (
        f'<g transform="translate({px:.1f},{py:.1f}) rotate({angle})">'
        f'<text x="0" y="0" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" '
        f'font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" '
        f'letter-spacing="0.5">{text}</text></g>'
    )


def plate_label(x, y, z, w, text, size=13, axis='x'):
    """A thin slab carrying a caption, as the reference uses for named controls."""
    d = 26
    out = [box(x, y, z, w, d, 6, sw=1.1)]
    out.append(label(x + w / 2, y + d / 2, z + 10, text, size=size, axis=axis))
    return ''.join(out)


def fitted_viewbox(pad: int = 18) -> str:
    """Viewbox tight to the drawing, so every scene sits centred in its panel."""
    xs = [p[0] for p in PTS]
    ys = [p[1] for p in PTS]
    x0, x1 = min(xs) - pad, max(xs) + pad
    y0, y1 = min(ys) - pad, max(ys) + pad
    w, h = x1 - x0, y1 - y0
    # Pad the shorter side so the aspect ratio stays consistent across the set.
    target = W / H
    if w / h < target:
        extra = h * target - w
        x0 -= extra / 2
        w = h * target
    else:
        extra = w / target - h
        y0 -= extra / 2
        h = w / target
    return f'{x0:.1f} {y0:.1f} {w:.1f} {h:.1f}'


def wrap(body: str, name: str, extra_css: str = '') -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{fitted_viewbox()}" width="{W}" height="{H}" fill="none" role="presentation">
  <style>
    .fl-{name} {{ animation: fl-{name} 6s ease-in-out infinite; transform-origin: center; }}
    @keyframes fl-{name} {{ 0%,100% {{ transform: translateY(0) }} 50% {{ transform: translateY(-5px) }} }}
    .pulse-{name} {{ animation: pulse-{name} 3.2s ease-in-out infinite; transform-origin: center; }}
    @keyframes pulse-{name} {{ 0%,100% {{ opacity: .35 }} 50% {{ opacity: 1 }} }}
    .draw-{name} {{ stroke-dasharray: 220; animation: draw-{name} 5s ease-in-out infinite; }}
    @keyframes draw-{name} {{ 0% {{ stroke-dashoffset: 220 }} 45%,100% {{ stroke-dashoffset: 0 }} }}
{extra_css}
    @media (prefers-reduced-motion: reduce) {{
      .fl-{name}, .pulse-{name}, .draw-{name} {{ animation: none; }}
      .draw-{name} {{ stroke-dasharray: none; }}
    }}
  </style>
{body}
</svg>
'''


def grid(step: int = 72, op: str = STROKE_SOFT) -> str:
    p = [f'    <path d="M{x} 0V{H}" stroke="{op}" stroke-width="1"/>' for x in range(0, W + 1, step)]
    p += [f'    <path d="M0 {y}H{W}" stroke="{op}" stroke-width="1"/>' for y in range(0, H + 1, step)]
    return '\n'.join(p)


# ---------------------------------------------------------------- scenes ----
# Each scene shows a mechanism and names its parts, rather than arranging
# abstract blocks. The labels are what make the drawing say something.

def software():
    """A monolith decomposed into separately deployable services."""
    p = [grid()]
    p.append(plate(-92, -46, 0, 46, 92, dash='4 5'))
    p.append(box(-88, -42, 0, 38, 84, 62))
    p.append(label(-69, 30, 64, 'LEGACY', anchor='middle', size=16))

    for i, (y, name) in enumerate([(-58, 'API'), (0, 'WEB'), (58, 'JOBS')]):
        acc = i == 0
        p.append(plate(18, y - 22, 0, 62, 44, dash='4 5'))
        p.append(box(22, y - 18, 0, 54, 36, 26, accent=acc))
        p.append(label(49, y + 4, 28, name, anchor='middle', size=15,
                       fill=ACCENT_INK if acc else INK))
        a, b2 = iso(-50, y * 0.35, 30), iso(22, y, 14)
        p.append(f'<path class="draw-software" d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" '
                 f'stroke="{ACCENT if acc else STROKE}" stroke-width="1.3" '
                 f'style="animation-delay:{i * 0.4:.1f}s"/>')
    return wrap('\n'.join(p), 'software')


def data():
    """Named sources through one governed pipeline to a single reported figure."""
    p = [grid()]
    for i, (y, name) in enumerate([(-62, 'ERP'), (0, 'CRM'), (62, 'EVENTS')]):
        p.append(box(-88, y - 16, 0, 44, 32, 14))
        p.append(label(-66, y + 4, 16, name, anchor='middle', size=14))
        a, b2 = iso(-44, y, 8), iso(-6, 0, 22)
        p.append(f'<path class="draw-data" d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" '
                 f'stroke="{STROKE}" stroke-width="1.2" style="animation-delay:{i * 0.3:.1f}s"/>')

    p.append(box(-6, -30, 0, 50, 60, 22))
    p.append(label(19, 4, 24, 'PIPELINE', anchor='middle', size=13))

    a, b2 = iso(44, 0, 12), iso(68, 0, 22)
    p.append(f'<path d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" stroke="{ACCENT}" stroke-width="1.5"/>')
    p.append(box(68, -26, 0, 34, 52, 36, accent=True))
    p.append(label(85, 0, 56, 'ONE NUMBER', anchor='middle', size=12, fill=ACCENT_INK))
    return wrap('\n'.join(p), 'data')


def cloud():
    """Instances added as demand crosses a threshold, with the control named."""
    p = [grid()]
    p.append(plate(-92, -34, 0, 172, 68, dash='4 5'))
    heights = [20, 30, 44, 58]
    for i, h in enumerate(heights):
        x = -84 + i * 42
        acc = i == len(heights) - 1
        p.append(box(x, -26, 0, 32, 52, h, accent=acc))
    # Demand line crossing the stack.
    a, b2 = iso(-92, -34, 50), iso(84, -34, 50)
    p.append(f'<path d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" stroke="{ACCENT}" '
             f'stroke-width="1.4" stroke-dasharray="6 5"/>')
    p.append(label(-60, -48, 58, 'DEMAND', size=12, anchor='middle', fill=ACCENT_INK))
    p.append(plate_label(-40, 52, 0, 104, 'AUTO SCALING'))
    return wrap('\n'.join(p), 'cloud')


def security():
    """A scan gate inside the delivery pipeline: one build stopped, the rest pass."""
    p = [grid()]
    stages = [(-92, 'COMMIT'), (-16, 'SCAN'), (56, 'DEPLOY')]
    for i, (x, name) in enumerate(stages):
        acc = i == 1
        p.append(box(x, -26, 0, 44, 52, 22 + (10 if acc else 0), accent=acc))
        p.append(label(x + 22, 0, 34 + (12 if acc else 0), name, anchor='middle', size=12,
                       fill=ACCENT_INK if acc else INK))
        if i < 2:
            a, b2 = iso(x + 44, 0, 12), iso(stages[i + 1][0], 0, 12)
            p.append(f'<path d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" stroke="{STROKE}" stroke-width="1.3"/>')
    # A blocked build turned back at the gate.
    a = iso(-16, -54, 30)
    p.append(f'<g class="pulse-security"><circle cx="{a[0]:.0f}" cy="{a[1]:.0f}" r="11" fill="#fff" '
             f'stroke="{ACCENT}" stroke-width="1.5"/>'
             f'<path d="M{a[0] - 4:.0f} {a[1] - 4:.0f}l8 8M{a[0] + 4:.0f} {a[1] - 4:.0f}l-8 8" '
             f'stroke="{ACCENT}" stroke-width="1.6" stroke-linecap="round"/></g>')
    p.append(label(-8, -66, 32, 'BLOCKED', size=13, fill=ACCENT_INK))
    return wrap('\n'.join(p), 'security')


def staffing():
    """An open seat in a team filled by a screened engineer."""
    p = [grid()]
    seats = [(-84, -58), (-84, 6), (-20, -58), (-20, 6), (44, -58), (44, 6)]
    for i, (x, y) in enumerate(seats):
        if i == 3:
            continue
        p.append(box(x, y, 0, 52, 52, 16))
        c = iso(x + 26, y + 26, 16)
        p.append(f'<circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="8" fill="#fff" stroke="{STROKE}" stroke-width="1.3"/>')
    p.append(plate(-20, 6, 0, 52, 52, stroke=ACCENT, dash='4 4'))
    p.append(f'<g class="fl-staffing">{box(-20, 6, 46, 52, 52, 16, accent=True)}</g>')
    c = iso(6, 32, 62)
    p.append(f'<g class="fl-staffing"><circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="8" fill="#fff" '
             f'stroke="{ACCENT}" stroke-width="1.5"/></g>')
    p.append(plate_label(-88, 74, 0, 120, 'SCREENED'))
    return wrap('\n'.join(p), 'staffing')


def program():
    """Workstreams on a shared timeline, with the dependency that gates delivery."""
    p = [grid()]
    rows = [(-72, 64, 'DISCOVER'), (-24, 46, 'BUILD'), (24, 88, 'INTEGRATE'), (72, 36, 'RELEASE')]

    # The board the bars sit on, so they read as one schedule rather than as
    # four floating slabs.
    p.append(plate(-74, -80, 0, 150, 182))
    for t in range(0, 4):
        x = -74 + t * 37.5
        a, b2 = iso(x, -80, 0), iso(x, 102, 0)
        p.append(f'    <path d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" stroke="{STROKE_SOFT}" stroke-width="1"/>')

    for i, (y, w, name) in enumerate(rows):
        acc = i == 2
        p.append(box(-70, y, 0, w, 26, 13, accent=acc))
        p.append(label(-84, y + 13, 15, name, size=11, anchor='end',
                       fill=ACCENT_INK if acc else INK))

    # BUILD must finish before INTEGRATE starts.
    a, b2 = iso(-24, -11, 15), iso(-70, 37, 15)
    p.append(f'    <path d="M{a[0]:.0f} {a[1]:.0f}L{b2[0]:.0f} {b2[1]:.0f}" stroke="{STROKE}" '
             f'stroke-width="1.2" stroke-dasharray="4 4"/>')

    m = iso(18, 37, 30)
    p.append(f'    <g class="pulse-program"><path d="M{m[0]:.0f} {m[1] - 9:.0f}l9 9-9 9-9-9z" '
             f'fill="#fff" stroke="{ACCENT}" stroke-width="1.6"/></g>')
    p.append(label(46, 37, 34, 'MILESTONE', size=11, anchor='start', fill=ACCENT_INK))
    p.append(plate_label(-70, 118, 0, 104, 'CRITICAL PATH'))
    return wrap('\n'.join(p), 'program')


SCENES = {
    'software-development': software,
    'ai-and-data': data,
    'cloud-infrastructure': cloud,
    'cybersecurity': security,
    'it-staffing': staffing,
    'program-management': program,
}

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in SCENES.items():
        VIEW.update({'scale': 1.18, 'ox': 240, 'oy': 150})
        PTS.clear()
        svg = fn()
        (OUT / f'{name}.svg').write_text(svg)
        print(f'{name}.svg  {len(svg):,} bytes')
