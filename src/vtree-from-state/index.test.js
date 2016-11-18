const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')

const startGameButtonStubReturn = Symbol('startGameButtonStubReturn')
const startGameButtonStub = () => startGameButtonStubReturn
const startGameButtonSpy = spy(startGameButtonStub)
mock('./start-game-button', startGameButtonSpy)

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
    startGameButtonSpy,
    instructionsSpy,
    winMessageSpy,
    arenaSpy
  ]
  .forEach(spy => spy.reset())
})

const {
  gameStatus: {
    idle,
    afoot,
    ended
  }
} = require('../constants')

const vtreeFromState = require('.')

const divData = {
  style: {textAlign: 'center'}
}

const expectedValuesForGameStatus = {
  [idle]: {
    vtree: div(
      divData,
      [
        startGameButtonStubReturn,
        instructionsStubReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [afoot]: {
    vtree: div(
      divData,
      [
        arenaStubReturn,
        instructionsStubReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [ended]: {
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
    const actualVtree = vtreeFromState({gameStatus})
    t.deepEqual(actualVtree, vtree)
  })

  test(`\`instructions\` call arg ${gameStatus} is '${instructionsCallArg}'`, t => {
    vtreeFromState({gameStatus})
    t.deepEqual(instructionsSpy.args, [[instructionsCallArg]])
  })
}

test('`arena` descendant calls args', t => {
  const state = {
    gameStatus: afoot,
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  vtreeFromState(state)

  const expectedArenaCallsArgs = [
    [state.leftHiding, state.rightHiding]
  ]
  t.deepEqual(arenaSpy.args, expectedArenaCallsArgs)
})

test('`winMessage` descendant call arg', t => {
  const winState = {
    gameStatus: ended,
    leftHiding: false,
    rightHiding: false,
    winner: Symbol()
  }
  const expectedCallsArgs = [
    [ winState.winner ]
  ]

  vtreeFromState(winState)
  t.deepEqual(winMessageSpy.args, expectedCallsArgs)
})
