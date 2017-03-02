const { test } = require('ava')
const { spy } = require('simple-spy')
const mock = require('mock-require')
const requireUncached = require('require-uncached')

const hReturn = Symbol('h')

test.beforeEach(t => {
  t.context.hSpy = spy((sel, data, children) => hReturn)
  mock('@cycle/dom', { h: t.context.hSpy })
  t.context.h = requireUncached('./h')
})

test('exports function of arity 2', t => {
  t.is(typeof t.context.h, 'function')
  t.is(t.context.h.length, 1)
})

test('calls `h` once', t => {
  t.context.h()
  t.is(t.context.hSpy.args.length, 1)
})

test('`h` call first arg', t => {
  t.context.h('foo')
  t.deepEqual(t.context.hSpy.args[0][0], 'shooter-foo')
})

test('`h` call rest of the args', t => {
  const args = [Symbol(), Symbol(), Symbol(), Symbol()]
  t.context.h('foo', ...args)
  t.deepEqual(t.context.hSpy.args[0].slice(1), args)
})

test('returns what `h` returns', t => {
  t.is(t.context.h(), hReturn)
})
