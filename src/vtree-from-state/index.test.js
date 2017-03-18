const { test } = require('ava')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')
const h = require('./h')
const requireUncached = require('require-uncached')

const startGameButtonMocks = mockPathWithSimpleSpy('./start-game-button')
const viewportMocks = mockPathWithSimpleSpy('./viewport')
const winMessageMocks = mockPathWithSimpleSpy('./win-message')
const instructionsMocks = mockPathWithSimpleSpy('./instructions')

test.beforeEach((t) => {
  t.context.startGameButtonMock = startGameButtonMocks.next().value
  t.context.viewportMock = viewportMocks.next().value
  t.context.winMessageMock = winMessageMocks.next().value
  t.context.instructionsMock = instructionsMocks.next().value
  t.context.subject = requireUncached('.')
})

const {
  gameStatus: {
    idle,
    afoot,
    ended,
    paused
  }
} = require('../constants')

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
        startGameButtonMocks.spyReturn,
        instructionsMocks.spyReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [afoot]: {
    vtree: h(elmName,
      data,
      [
        viewportMocks.spyReturn,
        instructionsMocks.spyReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [paused]: {
    vtree: h(elmName,
      data,
      [
        viewportMocks.spyReturn,
        instructionsMocks.spyReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [ended]: {
    vtree: h(elmName,
      data,
      [
        winMessageMocks.spyReturn,
        instructionsMocks.spyReturn
      ]
    ),
    instructionsCallArg: 'AFTER_WIN'
  }
}

Object.getOwnPropertySymbols(expectedValuesForGameStatus).forEach((gameStatus) => {
  const {vtree, instructionsCallArg} = expectedValuesForGameStatus[gameStatus]

  test(`vtree ${String(gameStatus)}`, t => {
    const actualVtree = t.context.subject({gameStatus})
    t.deepEqual(actualVtree, vtree)
  })

  test(`\`instructions\` call arg ${String(gameStatus)} is '${instructionsCallArg}'`, t => {
    t.context.subject({gameStatus})
    t.deepEqual(t.context.instructionsMock.args, [[instructionsCallArg]])
  })
})

;[afoot, paused].forEach((gameStatus) => {
  test(`\`viewport\` descendant calls args when ${String(gameStatus)}`, t => {
    const state = {
      gameStatus,
      leftHiding: Symbol('leftHiding'),
      rightHiding: Symbol('rightHiding')
    }

    t.context.subject(state)

    const expectedViewportCallsArgs = [
      [state.leftHiding, state.rightHiding, gameStatus === paused]
    ]
    t.deepEqual(t.context.viewportMock.args, expectedViewportCallsArgs)
  })
})

test('`winMessage` descendant call arg', t => {
  const winState = {
    gameStatus: ended,
    leftHiding: false,
    rightHiding: false,
    winner: Symbol('winState.winner')
  }
  const expectedCallsArgs = [
    [ winState.winner ]
  ]

  t.context.subject(winState)
  t.deepEqual(t.context.winMessageMock.args, expectedCallsArgs)
})
