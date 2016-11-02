const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')

const arenaStubReturn = Symbol('arenaStub')
const arenaStub = () => arenaStubReturn
const arenaSpy = spy(arenaStub)
mock('./arena', arenaSpy)

const winMessageStubReturn = Symbol('winMessageStub')
const winMessageStub = () => winMessageStubReturn
const winMessageSpy = spy(winMessageStub)
mock('./win-message', winMessageSpy)

test.beforeEach(() => {
  [
    winMessageSpy,
    arenaSpy
  ]
  .forEach(spy => spy.reset())
})

const uiFromState = require('.')

const divData = {
  style: {textAlign: 'center'}
}

const possibleWinStates = [
  {leftHiding: false, rightHiding: false, winner: 'LEFT_PLAYER'},
  {leftHiding: false, rightHiding: false, winner: 'RIGHT_PLAYER'}
]

test('vtree before win', t => {
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

const withPossibleWinState = winState => {
  test(`vtree after ${winState.winner} win`, t => {
    const expectedVtree = div(
      divData,
      [
        winMessageStubReturn
      ]
    )
    const actualVtree = uiFromState(winState)
    t.deepEqual(actualVtree, expectedVtree)
  })
}

possibleWinStates.forEach(withPossibleWinState)

test('`winMessage` descendant call arg', t => {
  const winState = {leftHiding: false, rightHiding: false, winner: Symbol()}
  const expectedCallsArgs = [
    [ winState.winner ]
  ]

  uiFromState(winState)
  t.deepEqual(winMessageSpy.args, expectedCallsArgs)
})
