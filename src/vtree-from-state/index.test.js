const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')
const h = require('./h')
const requireUncached = require('require-uncached')

const startGameButtonPath = './start-game-button'
const startGameButtonSpyReturn = Symbol(startGameButtonPath)
const viewportPath = './viewport'
const viewportSpyReturn = Symbol(viewportPath)
const winMessagePath = './win-message'
const winMessageSpyReturn = Symbol(winMessagePath)
const instructionsPath = './instructions'
const instructionsSpyReturn = Symbol(instructionsPath)

test.beforeEach((t) => {
  t.context.startGameButtonMock = mockPathWithSpy(startGameButtonPath, startGameButtonSpyReturn)
  t.context.viewportMock = mockPathWithSpy(viewportPath, viewportSpyReturn)
  t.context.winMessageMock = mockPathWithSpy(winMessagePath, winMessageSpyReturn)
  t.context.instructionsMock = mockPathWithSpy(instructionsPath, instructionsSpyReturn)
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
        startGameButtonSpyReturn,
        instructionsSpyReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [afoot]: {
    vtree: h(elmName,
      data,
      [
        viewportSpyReturn,
        instructionsSpyReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [paused]: {
    vtree: h(elmName,
      data,
      [
        viewportSpyReturn,
        instructionsSpyReturn
      ]
    ),
    instructionsCallArg: 'BEFORE_WIN'
  },
  [ended]: {
    vtree: h(elmName,
      data,
      [
        winMessageSpyReturn,
        instructionsSpyReturn
      ]
    ),
    instructionsCallArg: 'AFTER_WIN'
  }
}

Object.getOwnPropertySymbols(expectedValuesForGameStatus).forEach((gameStatus) => {
  const {vtree, instructionsCallArg} = expectedValuesForGameStatus[gameStatus]

  test(`vtree ${String(gameStatus)}`, t => {
    const actualVtree = t.context.subject({gameStatus})
    t.true(isEqual(actualVtree, vtree))
  })

  test(`\`instructions\` call arg ${String(gameStatus)} is '${instructionsCallArg}'`, t => {
    t.context.subject({gameStatus})
    t.true(isEqual(t.context.instructionsMock.spy.args, [[instructionsCallArg]]))
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
    t.true(isEqual(t.context.viewportMock.spy.args, expectedViewportCallsArgs))
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

  t.context.subject(winState)
  t.true(isEqual(t.context.winMessageMock.spy.args, expectedCallsArgs))
})
