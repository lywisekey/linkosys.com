import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const compiled = ts.transpileModule(
  readFileSync(new URL('../../src/helpers/analytics.ts', import.meta.url), 'utf8'),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }
).outputText

test('conversion delegation installs once and reports fixed labels without contact data', () => {
  const calls = [],
    listeners = [],
    exports = {}
  class Element {
    closest() {
      return this
    }
  }
  class Anchor extends Element {
    constructor(href, { button = false, main = true } = {}) {
      super()
      this.href = href
      const url = new URL(href, 'https://linkosys.com')
      this.origin = url.origin
      this.pathname = url.pathname
      this.classList = { contains: () => button }
      this.main = main
    }
    getAttribute() {
      return this.href
    }
    closest(selector) {
      return selector === 'main' ? (this.main ? this : null) : this
    }
  }
  vm.runInNewContext(compiled, {
    exports,
    Element,
    HTMLAnchorElement: Anchor,
    window: {
      gtag: (...args) => calls.push(args),
      location: {
        origin: 'https://linkosys.com',
        pathname: '/services/it-consulting',
        href: 'https://linkosys.com/services/it-consulting?email=private@example.com'
      }
    },
    document: { title: 'Consulting', addEventListener: (...args) => listeners.push(args) }
  })
  exports.installConversionTracking()
  exports.installConversionTracking()
  assert.equal(listeners.length, 1)
  const click = listeners[0][1]
  for (const href of [
    'mailto:info@linkosys.com',
    'tel:+19493544225',
    '/contact?service=Software',
    '/services'
  ]) {
    click({ target: new Anchor(href, { button: true }) })
  }
  click({ target: new Anchor('https://example.com/contact', { button: true }) })
  exports.trackConversion('generate_lead', { form_id: 'contact' })
  exports.trackPageView()
  assert.deepEqual(
    calls.map((call) => call[1]),
    [
      'business_email_click',
      'phone_click',
      'consultation_request',
      'cta_click',
      'generate_lead',
      'page_view'
    ]
  )
  assert.ok(!JSON.stringify(calls).includes('private@example.com'))
  assert.ok(!JSON.stringify(calls).includes('info@linkosys.com'))
  assert.ok(!JSON.stringify(calls).includes('19493544225'))
  assert.equal(calls.at(-1)[2].page_location, 'https://linkosys.com/services/it-consulting')
})

test('analytics remains safe with no browser or tracking provider', () => {
  const exports = {}
  vm.runInNewContext(compiled, { exports })
  assert.doesNotThrow(() => exports.trackConversion('generate_lead'))
  assert.doesNotThrow(() => exports.trackPageView())
  assert.doesNotThrow(() => exports.installConversionTracking())
})
