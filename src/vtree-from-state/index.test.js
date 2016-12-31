const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')
const h = require('./h')

const {
  spyReturn: startGameButtonReturnValue,
  spy: startGameButtonSpy
} = mockPathWithSpy('./start-game-button')

const {
  spyReturn: viewportReturnValue,
  spy: viewportSpy
} = mockPathWithSpy('./viewport')

const {
  spyReturn: winMessageReturnValue,
  spy: winMessageSpy
} = mockPathWithSpy('./win-message')

const {
  spyReturn: instructionsReturnValue,
  spy: instructionsSpy
} = mockPathWithSpy('./instructions')

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
    ended,
    paused
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
        startGameButtonReturnValue,
        instructionsReturnValue
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [afoot]: {
    vtree: h(elmName,
      data,
      [
        viewportReturnValue,
        instructionsReturnValue
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [paused]: {
    vtree: h(elmName,
      data,
      [
        viewportReturnValue,
        instructionsReturnValue
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [ended]: {
    vtree: h(elmName,
      data,
      [
        winMessageReturnValue,
        instructionsReturnValue
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

;[afoot, paused].forEach((gameStatus) => {
  test(`\`viewport\` descendant calls args when ${String(gameStatus)}`, t => {
    const state = {
      gameStatus,
      leftHiding: Symbol('leftHiding'),
      rightHiding: Symbol('rightHiding')
    }

    vtreeFromState(state)

    const expectedViewportCallsArgs = [
      [state.leftHiding, state.rightHiding, gameStatus === paused]
    ]
    t.true(isEqual(viewportSpy.args, expectedViewportCallsArgs))
  })
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
