const { test } = require('ava')
const isEqual = require('lodash.isequal')
const focusOnElmOfVnode = require('./focus-on-elm-of-vnode')
const { spy } = require('simple-spy')

const focusSpy = spy(() => {})

test.beforeEach(() => {
  focusSpy.reset()
})

test('returns undefined', t => {
  t.is(focusOnElmOfVnode({ elm: { focus: focusSpy } }), undefined)
})

test('specifies one argument', t => {
  t.is(focusOnElmOfVnode.length, 1)
})

test('calls `focus` on provided vnode’s `elm` with no arguments', t => {
  const expectedCallsArgs = [[]]
  focusOnElmOfVnode({ elm: { focus: focusSpy } })
  t.true(isEqual(focusSpy.args, expectedCallsArgs))
})
