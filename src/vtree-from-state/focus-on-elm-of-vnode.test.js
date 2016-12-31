const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { spy } = require('simple-spy')
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  t.context.subject = requireUncached('./focus-on-elm-of-vnode')
  t.context.focusSpy = spy(() => {})
})

test('returns undefined', t => {
  t.is(t.context.subject({ elm: { focus: t.context.focusSpy } }), undefined)
})

test('specifies one argument', t => {
  t.is(t.context.subject.length, 1)
})

test('calls `focus` on provided vnode’s `elm` with no arguments', t => {
  const expectedCallsArgs = [[]]
  t.context.subject({ elm: { focus: t.context.focusSpy } })
  t.true(isEqual(t.context.focusSpy.args, expectedCallsArgs))
})
