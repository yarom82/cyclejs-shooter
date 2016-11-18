const { test } = require('ava')
const focusOnElmFromVnode = require('./focus-on-elm-from-vnode')
const { spy } = require('simple-spy')

const focusSpy = spy(() => {})

test.beforeEach(() => {
  focusSpy.reset()
})

test('returns undefined', t => {
  t.is(focusOnElmFromVnode({ elm: { focus: focusSpy } }), undefined)
})

test('specifies one argument', t => {
  t.is(focusOnElmFromVnode.length, 1)
})

test('calls `focus` on provided vnode’s `elm` with no arguments', t => {
  const expectedCallsArgs = [[]]
  focusOnElmFromVnode({ elm: { focus: focusSpy } })
  t.deepEqual(focusSpy.args, expectedCallsArgs)
})
