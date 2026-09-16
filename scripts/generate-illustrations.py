#!/usr/bin/env python3
"""
Generates the isometric service illustrations in src/assets/images/illus/.

Design rules this file follows:

  * One camera for every scene — the same isometric basis, extrusion depth and
    outline weight, so the six read as one system.
  * The geometry carries the meaning. Each scene has to survive the test "remove
    every label; does a developer still know what this is?", which is why AI is
    a processor die and not a labelled cube.
  * Labels are horizontal, short and few. Rotating type to follow perspective
    hurts reading at the 320px width these render at.
  * Coral marks exactly one thing per scene: the active or added resource.

Run: python3 scripts/generate-illustrations.py
"""
import math
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / 'src/assets/images/illus'
W, H = 520, 340

# Palette. Coral stays the Linkosys logo red rather than a near-identical
# second red, so the illustrations match the rest of the site exactly.
STROKE = '#c9ced6'
STROKE_SOFT = '#e2e6ec'
FACE_T = '#ffffff'
FACE_L = '#eef1f5'
FACE_R = '#e4e9f0'
CORAL = '#ea3324'
CORAL_T = '#fdeceb'
CORAL_L = '#fbdad7'
CORAL_R = '#f7c9c5'
BLUE = '#2563eb'
INK = '#667085'
INK_DARK = '#111827'

SW = 1.15                      # one outline weight everywhere
COS30 = math.cos(math.radians(30))
VIEW = {'scale': 1.0, 'ox': 260, 'oy': 170}
PTS: list = []


# ------------------------------------------------------------------ basis ---

def iso(x, y, z=0.0):
    """x runs right-and-down, y left-and-down, z up. One basis for every scene."""
    k = VIEW['scale']
    x, y, z = x * k, y * k, z * k
    p = (VIEW['ox'] + (x - y) * COS30, VIEW['oy'] + (x + y) * 0.5 - z)
    PTS.append(p)
    return p


def poly(points, fill, stroke, sw=SW, extra=''):
    d = ' '.join(f'{p[0]:.1f},{p[1]:.1f}' for p in points)
    return f'<polygon points="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"{extra}/>'


def faces(coral):
    return (CORAL_T, CORAL_L, CORAL_R, CORAL) if coral else (FACE_T, FACE_L, FACE_R, STROKE)


def block(x, y, z, w, d, h, coral=False, cls=''):
    """A cuboid: the base unit of every structure here."""
    ft, fl, fr, st = faces(coral)
    g = f' class="{cls}"' if cls else ''
    top = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)]
    left = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)]
    right = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)]
    return (f'<g{g}>' + poly(left, fl, st) + poly(right, fr, st) + poly(top, ft, st) + '</g>')


def disc(x, y, z, r, fill=FACE_T, stroke=STROKE, cls=''):
    """A circle on the ground plane. Under this basis it projects to an
    axis-aligned ellipse, so no rotation is needed."""
    c = iso(x, y, z)
    k = VIEW['scale']
    rx, ry = 1.2247 * r * k, 0.7071 * r * k
    PTS.extend([(c[0] - rx, c[1] - ry), (c[0] + rx, c[1] + ry)])
    g = f' class="{cls}"' if cls else ''
    return (f'<ellipse{g} cx="{c[0]:.1f}" cy="{c[1]:.1f}" rx="{rx:.1f}" ry="{ry:.1f}" '
            f'fill="{fill}" stroke="{stroke}" stroke-width="{SW}"/>')


def cylinder(x, y, z, r, h, coral=False, cls=''):
    """A database. Two discs and the wall between them."""
    ft, fl, _, st = faces(coral)
    k = VIEW['scale']
    top, bot = iso(x, y, z + h), iso(x, y, z)
    rx, ry = 1.2247 * r * k, 0.7071 * r * k
    g = f' class="{cls}"' if cls else ''
    wall = (f'<path d="M{top[0] - rx:.1f} {top[1]:.1f}V{bot[1]:.1f}'
            f'A{rx:.1f} {ry:.1f} 0 0 0 {bot[0] + rx:.1f} {bot[1]:.1f}'
            f'V{top[1]:.1f}Z" fill="{fl}" stroke="{st}" stroke-width="{SW}"/>')
    return (f'<g{g}>' + wall
            + disc(x, y, z + h, r, ft, st)
            + '</g>')


def line(a, b, stroke=STROKE, sw=1.0, dash='', cls='', extra=''):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    g = f' class="{cls}"' if cls else ''
    return (f'<path{g} d="M{a[0]:.1f} {a[1]:.1f}L{b[0]:.1f} {b[1]:.1f}" stroke="{stroke}" '
            f'stroke-width="{sw}" stroke-linecap="round"{d}{extra}/>')


def ground(x, y, w, d, dash='3 5'):
    return poly([iso(x, y), iso(x + w, y), iso(x + w, y + d), iso(x, y + d)],
                'none', STROKE_SOFT, 1, f' stroke-dasharray="{dash}"')


def label(x, y, z, text, size=13, fill=INK, anchor='middle', dy=0, weight='600'):
    """Horizontal, so it stays readable at card width."""
    px, py = iso(x, y, z)
    py += dy
    half = len(text) * size * 0.35
    PTS.extend([(px - half, py - size), (px + half, py + size * 0.4)])
    return (f'<text x="{px:.1f}" y="{py:.1f}" font-family="ui-sans-serif,system-ui,-apple-system,'
            f'Segoe UI,Roboto,sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}" '
            f'text-anchor="{anchor}" letter-spacing="0.8">{text}</text>')


class Scene:
    """
    Collects markup with a depth key and paints back to front.

    Isometric drawings need painter ordering: an object nearer the camera has a
    larger x+y, and must be drawn later or it will be occluded by things behind
    it. Emitting in source order put perimeter walls through the middle of the
    cluster they enclose.
    """

    def __init__(self):
        self.items = []
        self.flat = []

    def add(self, markup, depth):
        self.items.append((depth, len(self.items), markup))

    def back(self, markup):
        """Ground planes and guides that always sit behind everything."""
        self.flat.append(markup)

    def front(self, markup):
        """Labels and signals that always sit on top."""
        self.items.append((1e6, len(self.items), markup))

    def render(self):
        ordered = [m for _, _, m in sorted(self.items, key=lambda t: (t[0], t[1]))]
        return '\n'.join(self.flat + ordered)


def fitted_viewbox(pad=20):
    xs = [p[0] for p in PTS]
    ys = [p[1] for p in PTS]
    x0, x1 = min(xs) - pad, max(xs) + pad
    y0, y1 = min(ys) - pad, max(ys) + pad
    w, h = x1 - x0, y1 - y0
    target = W / H
    if w / h < target:
        x0 -= (h * target - w) / 2
        w = h * target
    else:
        y0 -= (w / target - h) / 2
        h = w / target
    return f'{x0:.1f} {y0:.1f} {w:.1f} {h:.1f}'


def wrap(body, name):
    """Motion is slow and states-based: things activate, arrive, or appear."""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{fitted_viewbox()}" width="{W}" height="{H}" fill="none" role="presentation">
  <style>
    .flow-{name} {{ stroke-dasharray: 5 7; animation: flow-{name} 3.4s linear infinite; }}
    @keyframes flow-{name} {{ to {{ stroke-dashoffset: -24 }} }}
    .beat-{name} {{ animation: beat-{name} 3.6s ease-in-out infinite; }}
    @keyframes beat-{name} {{ 0%,100% {{ opacity: .32 }} 50% {{ opacity: 1 }} }}
    .rise-{name} {{ animation: rise-{name} 5s ease-in-out infinite; }}
    @keyframes rise-{name} {{ 0%,12% {{ opacity: 0; transform: translateY(9px) }} 30%,88% {{ opacity: 1; transform: none }} 100% {{ opacity: 0; transform: translateY(9px) }} }}
    @media (prefers-reduced-motion: reduce) {{
      .flow-{name}, .beat-{name}, .rise-{name} {{ animation: none; }}
      .rise-{name} {{ opacity: 1; transform: none; }}
      .flow-{name} {{ stroke-dasharray: none; }}
    }}
  </style>
{body}
</svg>
'''


def iso_path(d, z=0.0, fill=FACE_T, stroke=STROKE, sw=SW, cls='', bbox=()):
    """Lays an arbitrary 2D path onto the isometric plane at height z."""
    k = VIEW['scale']
    a, b = COS30 * k, 0.5 * k
    m = f'matrix({a:.4f},{b:.4f},{-a:.4f},{b:.4f},{VIEW["ox"]:.2f},{VIEW["oy"] - z * k:.2f})'
    for (u, v) in bbox:
        iso(u, v, z)
    g = f' class="{cls}"' if cls else ''
    return (f'<path{g} transform="{m}" d="{d}" fill="{fill}" stroke="{stroke}" '
            f'stroke-width="{sw / k:.2f}" stroke-linejoin="round"/>')


# ------------------------------------------------------------------ scenes ---

def software():
    """Application architecture: an app core, its API edge, storage, web, replicas."""
    s = Scene()
    s.back(ground(-120, -100, 240, 200))

    s.add(block(52, -84, 0, 44, 38, 18), 52 - 84)
    s.front(label(74, -65, 18, 'WEB', 12, INK, dy=-5))

    s.add(block(-34, -34, 0, 68, 68, 36), -34 - 34)
    s.add(block(-34, -34, 36, 68, 68, 12, coral=True), -34 - 34 + 0.5)
    s.front(label(0, 0, 48, 'API', 12, CORAL, dy=-4))
    s.front(label(0, 34, 18, 'APP', 13, INK_DARK, dy=16))

    s.add(cylinder(-88, 34, 0, 22, 30), -88 + 34)
    s.front(label(-88, 34, 40, 'DB', 12, INK, dy=-6))

    for i in range(3):
        s.add(block(72, 20 + i * 32, 0, 38, 24, 12), 72 + 20 + i * 32)
    s.front(label(91, 84, 12, 'REPLICAS', 11, INK, dy=26))

    s.add(line(iso(-34, 8, 22), iso(-70, 40, 26), STROKE, 1.1, cls='flow-software'), 1e5)
    s.add(line(iso(34, -18, 22), iso(56, -54, 16), STROKE, 1.1, cls='flow-software'), 1e5)
    return wrap(s.render(), 'software')


def data():
    """An AI accelerator receiving structured data and emitting one result."""
    s = Scene()
    s.back(ground(-130, -100, 260, 200))

    s.add(cylinder(-112, -34, 0, 22, 34), -112 - 34)
    s.front(label(-112, -34, 44, 'DATA', 11, INK, dy=-6))
    for i in range(3):
        s.add(block(-118, 26 + i * 20, 0, 52, 14, 6), -118 + 26 + i * 20)

    # Hero: the die. Pads on the two visible edges, traces and core on top.
    for i in range(6):
        s.add(block(-34 + i * 16, -58, 3, 8, 8, 4), -34 + i * 16 - 58)
        s.add(block(-52, -42 + i * 16, 3, 8, 8, 4), -52 - 42 + i * 16)
    s.add(block(-46, -50, 0, 96, 96, 12), -46 - 50)
    s.add(block(-46, -50, 12, 96, 96, 6, coral=True), -46 - 50 + 0.5)
    s.add(iso_path('M-22 -26H6V2H30M-22 6H2M6 -26V-44M-34 -10H-22', 18, 'none', STROKE, 1.0), 1e4)
    s.add(block(-16, -20, 18, 44, 44, 6, coral=True, cls='beat-data'), 1e4 + 1)
    s.front(label(6, 2, 26, 'AI', 14, CORAL, dy=-4))

    for i in range(3):
        s.add(line(iso(-74, -28 + i * 34, 16), iso(-50, -14 + i * 12, 16),
                   STROKE, 1.1, cls='flow-data'), 1e5)

    s.add(line(iso(50, 0, 16), iso(96, 0, 16), CORAL, 1.3, cls='flow-data'), 1e5)
    s.add(block(96, -22, 0, 42, 44, 28), 96)
    s.front(label(117, 0, 28, 'INSIGHT', 11, INK, dy=-5))
    return wrap(s.render(), 'data')


def cloud():
    """A cloud platform: compute replicas, storage and networking beneath it."""
    s = Scene()
    s.back(ground(-104, -80, 212, 172))

    cloud_d = ('M-86 12c-20 0-32-14-32-29 0-15 12-27 27-27 5-19 22-32 42-32 '
               '22 0 41 16 44 37 17 2 30 15 30 30 0 13-11 21-25 21z')
    s.back(iso_path(cloud_d, 116, FACE_T, STROKE, bbox=[(-118, -76), (78, 16)]))
    s.back(label(-20, -30, 130, 'CLOUD', 13, INK, dy=8))

    grid = [(-72, -46), (10, -46), (-72, 36), (10, 36)]
    for i, (x, y) in enumerate(grid):
        newest = i == 3
        s.add(line(iso(x + 22, y + 22, 92), iso(x + 22, y + 22, 34), STROKE_SOFT, 1, dash='3 5'), -1)
        s.add(block(x, y, 0, 44, 44, 26 + (i % 2) * 6, coral=newest,
                    cls=('rise-cloud' if newest else '')), x + y)
    s.front(label(-72, 14, 26, 'COMPUTE', 11, INK, anchor='end', dy=4))

    s.add(cylinder(96, -4, 0, 22, 30), 96 - 4)
    s.front(label(96, -4, 40, 'DB', 11, INK, dy=-8))
    s.add(line(iso(-84, 96, 6), iso(96, 24, 6), BLUE, 1.2, cls='flow-cloud'), 1e5)
    s.front(label(-4, 74, 6, 'NETWORK', 11, INK, dy=22))
    return wrap(s.render(), 'cloud')


def security():
    """Infrastructure inside a perimeter, traffic inspected at the boundary."""
    s = Scene()
    s.back(ground(-130, -110, 260, 220))

    X0, X1, Y0, Y1, T, HW = -92, 84, -78, 70, 12, 28
    # Back walls first, cluster next, front walls last: painter order is what
    # makes the ring read as enclosing rather than crossing the contents.
    s.add(block(X0, Y0, 0, X1 - X0, T, HW), X0 + Y0)
    s.add(block(X0, Y0, 0, T, Y1 - Y0, HW), X0 + Y0 + 0.1)

    for i in range(2):
        s.add(block(-56 + i * 52, -44, 0, 36, 34, 28), -56 + i * 52 - 44)
    s.add(cylinder(-20, 22, 0, 20, 28), -20 + 22)
    s.front(label(-20, 22, 38, 'PROTECTED', 11, INK, dy=-6))

    s.add(block(X1 - T, Y0, 0, T, Y1 - Y0, HW, coral=True), X1 + Y0)
    s.add(block(X0, Y1 - T, 0, X1 - X0, T, HW, coral=True), X0 + Y1)
    s.front(label(6, Y1, HW, 'PERIMETER', 11, CORAL, dy=16))

    for i in range(3):
        s.add(line(iso(-140, -50 + i * 46, 16), iso(-100, -50 + i * 46, 16),
                   BLUE, 1.2, cls='flow-security'), 1e5)
    return wrap(s.render(), 'security')


def staffing():
    """A delivery team as processing nodes, with one specialist joining it."""
    s = Scene()
    s.back(ground(-116, -96, 232, 192))

    nodes = [(-92, -68), (-16, -68), (60, -68), (-92, 8), (60, 8)]
    for (x, y) in nodes:
        s.add(block(x, y, 0, 44, 44, 22), x + y)
        c = iso(x + 22, y + 22, 22)
        s.add(f'<circle cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="7" fill="{FACE_T}" '
              f'stroke="{STROKE}" stroke-width="{SW}"/>', x + y + 0.1)

    s.back(poly([iso(-16, 8), iso(28, 8), iso(28, 52), iso(-16, 52)],
                'none', CORAL, 1, ' stroke-dasharray="4 4"'))
    s.add(block(-16, 8, 0, 44, 44, 22, coral=True, cls='rise-staffing'), -16 + 8)
    c = iso(6, 30, 22)
    s.add(f'<circle class="rise-staffing" cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="7" '
          f'fill="{FACE_T}" stroke="{CORAL}" stroke-width="{SW}"/>', -16 + 8 + 0.1)

    for (x, y) in [(-92, -68), (-16, -68), (60, 8)]:
        s.add(line(iso(x + 22, y + 22, 22), iso(6, 30, 22), STROKE_SOFT, 1, dash='3 4'), -100)

    s.front(label(6, 30, 22, 'TEAM', 12, INK, dy=52))
    return wrap(s.render(), 'staffing')


def program():
    """A delivery pipeline: sequential stages with one in progress."""
    s = Scene()
    s.back(ground(-172, -46, 372, 92))

    stages = [('PLAN', False), ('BUILD', False), ('TEST', True), ('RELEASE', False)]
    for i, (name, active) in enumerate(stages):
        x = -156 + i * 100
        h = 32 if active else 21
        s.add(block(x, -17, 0, 34, 34, h, coral=active,
                    cls=('beat-program' if active else '')), x - 20)
        s.front(label(x + 17, 0, h, name, 11, CORAL if active else INK, dy=-6))
        if i < len(stages) - 1:
            s.add(line(iso(x + 34, 0, 9), iso(x + 100, 0, 9), STROKE, 1.2,
                       cls='flow-program'), x + 40 - 0.5)

    g = iso(128, -46, 30)
    s.front(f'<g class="beat-program"><path d="M{g[0]:.1f} {g[1] - 10:.1f}l10 10-10 10-10-10z" '
            f'fill="{FACE_T}" stroke="{CORAL}" stroke-width="1.5"/></g>')
    return wrap(s.render(), 'program')


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
        VIEW.update({'scale': 1.0, 'ox': 260, 'oy': 170})
        PTS.clear()
        svg = fn()
        (OUT / f'{name}.svg').write_text(svg)
        print(f'{name}.svg  {len(svg):,} bytes')
