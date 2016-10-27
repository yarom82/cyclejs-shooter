const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')
const R = require('ramda')

const playerStubReturn = Symbol('playerStub')
const playerStub = () => playerStubReturn
const playerSpy = spy(playerStub)
test.afterEach(() => playerSpy.reset())
mock('./player', R.curryN(2, playerSpy))

const arena = require('./arena')

const divData = {
  attrs: {tabindex: 0},
  style: {fontFamily: 'monospace'}
}
const barrier = '='

test(t => {
  const args = [
    Symbol('leftHiding'),
    Symbol('rightHiding')
  ]

  const expectedVtree = div(
    divData,
    [
      playerStubReturn,
      barrier,
      playerStubReturn
    ]
  )
  const actualVtree = arena(...args)
  t.deepEqual(actualVtree, expectedVtree, 'Vtree')

  const expectedPlayerCallsArgs = [
    ['left', args[0]],
    ['right', args[1]]
  ]
  t.deepEqual(playerSpy.args, expectedPlayerCallsArgs, '`player` calls args')
  t.is(playerSpy.callCount, 2, '`player` call count')
})
