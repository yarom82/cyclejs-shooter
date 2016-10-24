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

const uiFromState = require('.')

const divData = {
  attrs: {tabindex: 0},
  style: {fontFamily: 'monospace', textAlign: 'center'}
}
const barrier = '='

test(t => {
  const state = {
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  const expectedVtree = div(
    divData,
    [
      playerStubReturn,
      barrier,
      playerStubReturn
    ]
  )
  const actualVtree = uiFromState(state)
  t.deepEqual(actualVtree, expectedVtree, 'Vtree')

  const expectedPlayerCallsArgs = [
    ['left', state.leftHiding],
    ['right', state.rightHiding]
  ]
  t.deepEqual(playerSpy.args, expectedPlayerCallsArgs, '`player` calls args')
  t.is(playerSpy.callCount, 2, '`player` call count')
})
