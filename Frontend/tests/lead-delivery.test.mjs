import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

// Supply Vite's build-time environment for this isolated Node test.
const source = (await readFile(new URL('../src/services/api.js', import.meta.url), 'utf8'))
  .replace('import.meta.env.VITE_API_BASE_URL', 'undefined')
const { api } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const payload = { name: 'Test visitor', email: 'visitor@example.com', message: 'A mobile project' }

// No visitor inquiry should be cached locally or acknowledged as delivered on failure.
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => assert.fail('Inquiry delivery must not write a local success record'),
}

test('contact delivery reflects the backend outcome', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => { globalThis.fetch = originalFetch })

  await t.test('returns a confirmed backend receipt', async () => {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, '/api/v1/leads')
      assert.equal(options.method, 'POST')
      assert.deepEqual(JSON.parse(options.body), payload)
      return { ok: true, json: async () => ({ success: true, data: { id: 42 } }) }
    }
    assert.equal((await api.submitLead(payload)).data.id, 42)
  })

  await t.test('rejects the development proxy offline response', async () => {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ success: false, offline: true }) })
    await assert.rejects(api.submitLead(payload), /could not be delivered/)
  })

  await t.test('rejects network failure without a fabricated receipt', async () => {
    globalThis.fetch = async () => { throw new Error('Network unavailable') }
    await assert.rejects(api.submitLead(payload), /Network unavailable/)
  })

  await t.test('preserves a server validation error', async () => {
    globalThis.fetch = async () => ({ ok: false, json: async () => ({ message: 'Invalid email' }) })
    await assert.rejects(api.submitLead(payload), /Invalid email/)
  })
})
