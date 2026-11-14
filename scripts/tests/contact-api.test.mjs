import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Mock only the email boundary: no real messages or credentials are used.
const source = readFileSync(new URL('../../api/send-email.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText
const valid = {
  name: 'A <Client>', email: 'client@example.com', phone: '',
  company: 'Example', interest: 'Software Development', message: '<script>hello</script>'
}
async function request(body, { method = 'POST', result = { data: { id: 'test' }, error: null }, throws = false } = {}) {
  const calls = []
  const exports = {}
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.equal(name, 'resend')
      return { Resend: class {
        emails = { send: async (message) => {
          calls.push(message)
          if (throws) throw new Error('Provider unavailable')
          return result
        } }
      } }
    },
    process: { env: {} }, console: { error() {} }
  })
  const response = { code: 0, data: null,
    status(code) { this.code = code; return this },
    json(data) { this.data = data; return this }
  }
  await exports.default({ method, body }, response)
  return { ...response, calls }
}

test('provider error objects cannot produce a false success', async () => {
  const response = await request(valid, { result: { data: null, error: { message: 'Rejected' } } })
  assert.equal(response.code, 500)
  assert.equal(response.data.success, false)
})
test('provider exceptions return an actionable failure', async () => {
  const response = await request(valid, { throws: true })
  assert.equal(response.code, 500)
  assert.equal(response.data.success, false)
})
test('successful mail escapes user content and sets reply-to', async () => {
  const response = await request(valid)
  assert.equal(response.code, 200)
  assert.equal(response.data.success, true)
  assert.equal(response.calls[0].replyTo, valid.email)
  assert.ok(response.calls[0].html.includes('&lt;script&gt;hello&lt;/script&gt;'))
  assert.ok(!response.calls[0].html.includes('<script>'))
})
test('malformed and incomplete requests never send mail', async () => {
  for (const body of [null, [], 'text', {}, { ...valid, name: ' ' },
    { ...valid, message: {} }, { ...valid, company: '' },
    { ...valid, interest: null }, { ...valid, email: 'bad' },
    { ...valid, phone: 123 }, { ...valid, message: 'x'.repeat(5001) }]) {
    const response = await request(body)
    assert.equal(response.code, 400)
    assert.equal(response.calls.length, 0)
  }
})
test('honeypot absorbs bot submissions without sending', async () => {
  const response = await request({ ...valid, website: 'https://spam.example' })
  assert.equal(response.data.success, true)
  assert.equal(response.calls.length, 0)
})
test('unsupported methods do not send mail', async () => {
  const response = await request(undefined, { method: 'GET' })
  assert.equal(response.code, 405)
  assert.equal(response.calls.length, 0)
})
