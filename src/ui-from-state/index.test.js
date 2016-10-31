const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')

const arenaStubReturn = Symbol('arenaStub')
const arenaStub = () => arenaStubReturn
const arenaSpy = spy(arenaStub)
test.afterEach(() => arenaSpy.reset())
mock('./arena', arenaSpy)

const uiFromState = require('.')

const divData = {
  style: {textAlign: 'center'}
}

test('vtree', t => {
  const expectedVtree = div(
    divData,
    [
      arenaStubReturn
    ]
  )
  const actualVtree = uiFromState({})
  t.deepEqual(actualVtree, expectedVtree)
})

test('`arena` descendant calls args', t => {
  const state = {
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  uiFromState(state)

  const expectedArenaCallsArgs = [
    [state.leftHiding, state.rightHiding]
  ]
  t.deepEqual(arenaSpy.args, expectedArenaCallsArgs)
})
