"""Validate the actual prerendered output. Uses only Python's standard library."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
SITE = 'https://linkosys.com'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.tags, self.ids, self.scripts = [], set(), []
        self.title, self.script, self.in_title = '', None, False
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs: self.ids.add(attrs['id'])
        if tag == 'title': self.in_title = True
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.script = ''
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.script is not None: self.script += data
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.script is not None:
            node = json.loads(self.script)
            self.scripts.extend(node if isinstance(node, list) else [node])
            self.script = None
    def attrs(self, tag, key=None, value=None):
        return [a for t, a in self.tags if t == tag and (key is None or a.get(key) == value)]

urls = [e.text for e in ET.parse(DIST / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
pages = {urlparse(url).path: Page(DIST / urlparse(url).path.lstrip('/') / 'index.html') for url in urls}
titles, descriptions = set(), set()
link_count = 0
for path, page in pages.items():
    assert len(page.attrs('h1')) == 1, f'{path}: expected one H1'
    assert page.title and page.title not in titles, f'{path}: duplicate/missing title'
    titles.add(page.title)
    descriptions_here = page.attrs('meta', 'name', 'description')
    assert len(descriptions_here) == 1
    description = descriptions_here[0]['content']
    assert description and description not in descriptions, f'{path}: duplicate description'
    descriptions.add(description)
    assert page.attrs('link', 'rel', 'canonical') == [{'rel': 'canonical', 'href': SITE + path}], path
    assert 'noindex' not in page.attrs('meta', 'name', 'robots')[0]['content'], path
    for key in ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']:
        assert len(page.attrs('meta', 'property', key)) == 1, f'{path}: {key}'
    for key in ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']:
        assert len(page.attrs('meta', 'name', key)) == 1, f'{path}: {key}'
    assert page.attrs('meta', 'property', 'og:title')[0]['content'] == page.title
    assert page.attrs('meta', 'name', 'twitter:title')[0]['content'] == page.title
    for img in page.attrs('img'):
        assert 'alt' in img, f'{path}: image without alt {img}'
    types = [node.get('@type') for node in page.scripts]
    assert types.count('Organization') == types.count('WebSite') == types.count('WebPage') == 1, (path, types)
    if path != '/': assert types.count('BreadcrumbList') == 1, path
    definitions = {node['@id'] for node in page.scripts if '@id' in node}
    def check_refs(value):
        if isinstance(value, dict):
            if set(value) == {'@id'}: assert value['@id'] in definitions, (path, value)
            for child in value.values(): check_refs(child)
        elif isinstance(value, list):
            for child in value: check_refs(child)
    check_refs(page.scripts)
    for node in page.scripts:
        if node.get('@type') == 'BreadcrumbList':
            for item in node['itemListElement']: assert urlparse(item['item']).path in pages, (path, item)
    for tag, attrs in page.tags:
        raw = attrs.get('href') if tag == 'a' else attrs.get('src') if tag in ['img', 'script'] else None
        if not raw: continue
        url = urlparse(raw)
        if url.scheme and url.scheme not in ['http', 'https']: continue
        if url.netloc and url.netloc != 'linkosys.com': continue
        target = unquote(url.path) or path
        if target in pages:
            if url.fragment: assert unquote(url.fragment) in pages[target].ids, (path, raw, 'missing anchor')
        else:
            assert (DIST / target.lstrip('/')).is_file(), (path, raw, 'missing internal target')
        link_count += 1
fallback = Page(DIST / 'spa-fallback.html')
assert 'noindex' in fallback.attrs('meta', 'name', 'robots')[0]['content']
assert not fallback.attrs('link', 'rel', 'canonical')
contact = pages['/contact']
for field in ['lk-name', 'lk-email', 'lk-company', 'lk-interest', 'lk-message', 'lk-captcha']:
    assert field in contact.ids, field
assert 'lk-feedback' in contact.ids
for filename in ['404.html', 'commingsoon/index.html']:
    excluded = Page(DIST / filename)
    assert len(excluded.attrs('h1')) == 1, filename
    assert 'noindex' in excluded.attrs('meta', 'name', 'robots')[0]['content'], filename
    assert not excluded.attrs('link', 'rel', 'canonical'), filename
hosting = json.loads((ROOT / 'vercel.json').read_text())
assert not hosting.get('rewrites'), 'Catch-all rewrites mask real 404 responses'
print(f'Validated {len(pages)} prerendered pages, {link_count} local links/assets, unique metadata, H1s, image alt attributes, JSON-LD references, breadcrumbs, contact fields and noindex fallback.')
