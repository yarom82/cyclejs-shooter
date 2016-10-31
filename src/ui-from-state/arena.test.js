const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')
const R = require('ramda')

const playerStubReturn = Symbol('playerStub')
const playerStub = (side, hiding) => playerStubReturn
const playerSpy = spy(playerStub)
test.afterEach(() => playerSpy.reset())
mock('./player', R.curryN(2, playerSpy))

const arena = require('./arena')

const divData = {
  attrs: {tabindex: 0},
  style: {fontFamily: 'monospace'}
}
const barrier = '='

test('vtree', t => {
  const expectedVtree = div(
    divData,
    [
      playerStubReturn,
      barrier,
      playerStubReturn
    ]
  )

  const actualVtree = arena()
  t.deepEqual(actualVtree, expectedVtree)
})

test('`player` descendants calls args', t => {
  const args = [
    Symbol('leftHiding'),
    Symbol('rightHiding')
  ]
  const expectedPlayerCallsArgs = [
    ['left', args[0]],
    ['right', args[1]]
  ]
  arena(...args)
  t.deepEqual(playerSpy.args, expectedPlayerCallsArgs)
})
