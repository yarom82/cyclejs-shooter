const { test } = require('ava')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const { div } = require('@cycle/dom')

const {
  returnSymbol: startGameButtonReturnSymbol
  // spy is missing here; #142
} = mockPathWithSpyThatReturnsSymbolHere('./start-game-button')

const {
  returnSymbol: arenaReturnSymbol,
  spy: arenaSpy
} = mockPathWithSpyThatReturnsSymbolHere('./arena')

const {
  returnSymbol: winMessageReturnSymbol,
  spy: winMessageSpy
} = mockPathWithSpyThatReturnsSymbolHere('./win-message')

const {
  returnSymbol: instructionsReturnSymbol,
  spy: instructionsSpy
} = mockPathWithSpyThatReturnsSymbolHere('./instructions')

test.beforeEach(() => {
  [
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
        startGameButtonReturnSymbol,
        instructionsReturnSymbol
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [afoot]: {
    vtree: div(
      divData,
      [
        arenaReturnSymbol,
        instructionsReturnSymbol
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [ended]: {
    vtree: div(
      divData,
      [
        winMessageReturnSymbol,
        instructionsReturnSymbol
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
