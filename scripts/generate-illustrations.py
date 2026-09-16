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
INK = '#8497ad'

COS30 = math.cos(math.radians(30))


# Mutable framing, set per scene before drawing.
VIEW = {'scale': 1.18, 'ox': 240, 'oy': 150}


def iso(x, y, z=0):
    """Isometric projection: x runs right-down, y left-down, z up."""
    k = VIEW['scale']
    x, y, z = x * k, y * k, z * k
    return (VIEW['ox'] + (x - y) * COS30, VIEW['oy'] + (x + y) * 0.5 - z)


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


def wrap(body: str, name: str, extra_css: str = '') -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" fill="none" role="presentation">
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


# ---------------------------------------------------------------- scenes ----

def software():
    """Modular blocks assembled into one system; one module lifts clear."""
    p = [plate(-70, -70, 0, 140, 140, dash='4 5')]
    for (x, y) in [(-60, -60), (-60, 10), (10, -60), (10, 10)]:
        p.append(box(x, y, 0, 50, 50, 26))
    for (x, y) in [(-60, -60), (10, 10)]:
        p.append(box(x, y, 26, 50, 50, 22))
    p.append(f'<g class="fl-software">{box(10, -60, 72, 50, 50, 22, accent=True)}</g>')
    a, b = iso(35, -35, 60), iso(35, -35, 30)
    p.append(f'<path class="pulse-software" d="M{a[0]:.0f} {a[1]:.0f}V{b[1]:.0f}" stroke="{ACCENT}" stroke-width="1.4" stroke-dasharray="3 4"/>')
    return wrap('\n'.join(p), 'software')


def data():
    """Scattered readings resolving into one governed table."""
    p = [plate(-80, -80, 0, 160, 160, dash='4 5')]
    pts = [(-76, -20), (-80, 30), (-28, -66), (30, -70), (74, -8), (66, 40)]
    for i, (x, y) in enumerate(pts):
        c = iso(x, y, 30 + (i % 3) * 12)
        t = iso(15, 15, 52)
        p.append(f'<path class="draw-data" d="M{c[0]:.0f} {c[1]:.0f}Q{(c[0]+t[0])/2:.0f} {c[1]-26:.0f} {t[0]:.0f} {t[1]:.0f}" stroke="{INK}" stroke-width="1.25" style="animation-delay:{i*0.35:.2f}s"/>')
    p.append(box(-20, -20, 0, 70, 70, 15))
    p.append(box(-20, -20, 15, 70, 70, 15))
    p.append(box(-20, -20, 30, 70, 70, 15, accent=True))
    for i, (x, y) in enumerate(pts):
        c = iso(x, y, 30 + (i % 3) * 12)
        p.append(f'<circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="4.2" fill="#fff" stroke="{INK}" stroke-width="1.4"/>')
    return wrap('\n'.join(p), 'data')


def cloud():
    """A platform slab with instances scaling out above it."""
    p = [plate(-90, -90, 0, 180, 180, dash='4 5')]
    p.append(box(-80, -80, 0, 160, 160, 12))
    for i, (x, y) in enumerate([(-58, -58), (2, -58), (-58, 2), (2, 2)]):
        p.append(box(x, y, 12, 46, 46, 18 + (i % 2) * 10))
    p.append(f'<g class="fl-cloud">{box(2, -58, 66, 46, 46, 18, accent=True)}</g>')
    for i, (x, y) in enumerate([(-58, -58), (-58, 2), (2, 2)]):
        a = iso(x + 23, y + 23, 46)
        p.append(f'<circle class="pulse-cloud" cx="{a[0]:.0f}" cy="{a[1]:.0f}" r="2.8" fill="{INK}" style="animation-delay:{i*0.5:.1f}s"/>')
    return wrap('\n'.join(p), 'cloud')


def security():
    """Concentric perimeters around a protected core, one gate open."""
    p = []
    for i, s in enumerate([156, 112, 68]):
        h, t = 14 + i * 8, 10
        p.append(plate(-s / 2 - 8, -s / 2 - 8, 0, s + 16, s + 16, dash='4 5'))
        p.append(box(-s / 2, -s / 2, 0, s, t, h, sw=1.1))
        p.append(box(-s / 2, s / 2 - t, 0, s, t, h, sw=1.1))
        p.append(box(-s / 2, -s / 2 + t, 0, t, s - 2 * t, h, sw=1.1))
        p.append(box(s / 2 - t, -s / 2 + t, 0, t, s - 2 * t, h, sw=1.1))
    p.append(box(-20, -20, 0, 40, 40, 40, accent=True))
    a = iso(0, 0, 30)
    p.append(f'<circle class="pulse-security" cx="{a[0]:.0f}" cy="{a[1]:.0f}" r="9" fill="none" stroke="{ACCENT}" stroke-width="1.3"/>')
    return wrap('\n'.join(p), 'security')


def staffing():
    """An assembled team grid with one open seat being filled."""
    p = [plate(-85, -85, 0, 170, 170, dash='4 5')]
    seats = [(-70, -70), (-70, 0), (0, -70), (0, 0), (-70, 70), (0, 70), (70, -70), (70, 0)]
    for i, (x, y) in enumerate(seats):
        if i == 3:
            continue
        p.append(box(x, y, 0, 46, 46, 16))
        c = iso(x + 23, y + 23, 16)
        p.append(f'<circle cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="7" fill="#fff" stroke="{STROKE}" stroke-width="1.2"/>')
    p.append(plate(0, 0, 0, 46, 46, stroke=ACCENT, dash='4 4'))
    p.append(f'<g class="fl-staffing">{box(0, 0, 44, 46, 46, 16, accent=True)}</g>')
    a, b = iso(23, 23, 40), iso(23, 23, 14)
    p.append(f'<path class="pulse-staffing" d="M{a[0]:.0f} {a[1]:.0f}V{b[1]:.0f}" stroke="{ACCENT}" stroke-width="1.4" stroke-dasharray="3 4"/>')
    return wrap('\n'.join(p), 'staffing')


def program():
    """A schedule of workstreams with one milestone reached."""
    p = [plate(-95, -80, 0, 190, 160, dash='4 5')]
    bars = [(-60, -54, 74), (-60, -18, 50), (-60, 18, 96), (-60, 54, 36)]
    for i, (x, y, w) in enumerate(bars):
        p.append(plate(x, y, 0, 112, 24, stroke=STROKE_SOFT, dash='4 5'))
        acc = i == 2
        p.append(box(x, y, 0, w, 24, 14 + (4 if acc else 0), accent=acc))
    for i, (x, y, w) in enumerate(bars):
        c = iso(x + w, y + 12, 18)
        p.append(f'<circle class="pulse-program" cx="{c[0]:.0f}" cy="{c[1]:.0f}" r="3.6" fill="#fff" stroke="{ACCENT if i == 2 else INK}" stroke-width="1.4" style="animation-delay:{i*0.4:.1f}s"/>')
    top, bot = iso(-60, -64, 22), iso(-60, 86, 0)
    p.append(f'<path d="M{top[0]:.0f} {top[1]:.0f}L{bot[0]:.0f} {bot[1]:.0f}" stroke="{STROKE}" stroke-width="1.4"/>')
    return wrap('\n'.join(p), 'program')


SCENES = {
    'software-development': software,
    'ai-and-data': data,
    'cloud-infrastructure': cloud,
    'cybersecurity': security,
    'it-staffing': staffing,
    'program-management': program,
}

# Scenes that need their own framing.
FRAMING = {
    'ai-and-data': {'scale': 1.12, 'ox': 240, 'oy': 168},
    'program-management': {'scale': 1.22, 'ox': 238, 'oy': 152},
}

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in SCENES.items():
        VIEW.update({'scale': 1.18, 'ox': 240, 'oy': 150})
        VIEW.update(FRAMING.get(name, {}))
        svg = fn()
        (OUT / f'{name}.svg').write_text(svg)
        print(f'{name}.svg  {len(svg):,} bytes')
