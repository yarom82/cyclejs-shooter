const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')
const R = require('ramda')

const arenaStubReturn = Symbol('arenaStub')
const arenaStub = () => arenaStubReturn
const arenaSpy = spy(arenaStub)
test.afterEach(() => arenaSpy.reset())
mock('./arena', R.curryN(2, arenaSpy))

const uiFromState = require('.')

const divData = {
  style: {textAlign: 'center'}
}

test(t => {
  const state = {
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  const expectedVtree = div(
    divData,
    [
      arenaStubReturn
    ]
  )
  const actualVtree = uiFromState(state)
  t.deepEqual(actualVtree, expectedVtree, 'Vtree')

  const expectedArenaCallsArgs = [
    [state.leftHiding, state.rightHiding]
  ]
  t.deepEqual(arenaSpy.args, expectedArenaCallsArgs, '`arena` calls args')
  t.is(arenaSpy.callCount, 1, '`arena` call count')
})
