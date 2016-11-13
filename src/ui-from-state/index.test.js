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

const instructionsStubReturn = Symbol('instructionsStubReturn')
const instructionsStub = () => instructionsStubReturn
const instructionsSpy = spy(instructionsStub)
mock('./instructions', instructionsSpy)

test.beforeEach(() => {
  [
    instructionsSpy,
    winMessageSpy,
    arenaSpy
  ]
  .forEach(spy => spy.reset())
})

const uiFromState = require('.')

const divData = {
  style: {textAlign: 'center'}
}

const expectedValuesForGameStatus = {
  'AFOOT': {
    vtree: div(
      divData,
      [
        arenaStubReturn,
        instructionsStubReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  'ENDED': {
    vtree: div(
      divData,
      [
        winMessageStubReturn,
        instructionsStubReturn
      ]
    ),
    instructionsCallArg: 'AFTER_WIN'
  }
}

for (const gameStatus in expectedValuesForGameStatus) {
  const {vtree, instructionsCallArg} = expectedValuesForGameStatus[gameStatus]

  test(`vtree ${gameStatus}`, t => {
    const actualVtree = uiFromState({gameStatus})
    t.deepEqual(actualVtree, vtree)
  })

  test(`\`instructions\` call arg ${gameStatus} is '${instructionsCallArg}'`, t => {
    uiFromState({gameStatus})
    t.deepEqual(instructionsSpy.args, [[instructionsCallArg]])
  })
}

test('`arena` descendant calls args', t => {
  const state = {
    gameStatus: 'AFOOT',
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  uiFromState(state)

  const expectedArenaCallsArgs = [
    [state.leftHiding, state.rightHiding]
  ]
  t.deepEqual(arenaSpy.args, expectedArenaCallsArgs)
})

test('`winMessage` descendant call arg', t => {
  const winState = {
    gameStatus: 'ENDED',
    leftHiding: false,
    rightHiding: false,
    winner: Symbol()
  }
  const expectedCallsArgs = [
    [ winState.winner ]
  ]

  uiFromState(winState)
  t.deepEqual(winMessageSpy.args, expectedCallsArgs)
})
