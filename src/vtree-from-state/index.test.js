const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const h = require('./h')

const {
  returnSymbol: startGameButtonReturnSymbol,
  spy: startGameButtonSpy
} = mockPathWithSpyThatReturnsSymbolHere('./start-game-button')

const {
  returnSymbol: viewportReturnSymbol,
  spy: viewportSpy
} = mockPathWithSpyThatReturnsSymbolHere('./viewport')

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
    startGameButtonSpy,
    instructionsSpy,
    winMessageSpy,
    viewportSpy
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

const data = {
  style: {
    display: 'flex',
    flexDirection: 'column'
  }
}

const elmName = 'index'

const expectedValuesForGameStatus = {
  [idle]: {
    vtree: h(elmName,
      data,
      [
        startGameButtonReturnSymbol,
        instructionsReturnSymbol
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [afoot]: {
    vtree: h(elmName,
      data,
      [
        viewportReturnSymbol,
        instructionsReturnSymbol
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [ended]: {
    vtree: h(elmName,
      data,
      [
        winMessageReturnSymbol,
        instructionsReturnSymbol
      ]
    ),
    instructionsCallArg: 'AFTER_WIN'
  }
}

Object.getOwnPropertySymbols(expectedValuesForGameStatus).forEach((gameStatus) => {
  const {vtree, instructionsCallArg} = expectedValuesForGameStatus[gameStatus]

  test(`vtree ${String(gameStatus)}`, t => {
    const actualVtree = vtreeFromState({gameStatus})
    t.true(isEqual(actualVtree, vtree))
  })

  test(`\`instructions\` call arg ${String(gameStatus)} is '${instructionsCallArg}'`, t => {
    vtreeFromState({gameStatus})
    t.true(isEqual(instructionsSpy.args, [[instructionsCallArg]]))
  })
})

test('`viewport` descendant calls args', t => {
  const state = {
    gameStatus: afoot,
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  vtreeFromState(state)

  const expectedViewportCallsArgs = [
    [state.leftHiding, state.rightHiding]
  ]
  t.true(isEqual(viewportSpy.args, expectedViewportCallsArgs))
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
  t.true(isEqual(winMessageSpy.args, expectedCallsArgs))
})
