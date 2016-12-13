const stateMachine = require('./state-machine')
const { test } = require('ava')
const stringFromObject = require('../utils/single-line-string-from-object')
const {
  gameStatus: {
    idle,
    afoot,
    ended
  },
  actionNames: {
    startGame,
    hide,
    unhide,
    shoot
  },
  actionPayloadKeys: {
    player
  },
  players: {
    leftPlayer,
    rightPlayer
  }
} = require('./constants')
const actionNameKey = require('./action').nameKey

const testsForActionName = {
  [startGame]: [
    {
      currentState: { gameStatus: idle },
      expectedState: { gameStatus: afoot }
    }
  ],
  [hide]: [
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: false },
      expectedState: { leftHiding: true }
    },
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: true },
      expectedState: { leftHiding: true }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { rightHiding: false },
      expectedState: { rightHiding: true }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { rightHiding: true },
      expectedState: { rightHiding: true }
    }
  ],
  [unhide]: [
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: false },
      expectedState: { leftHiding: false }
    },
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: true },
      expectedState: { leftHiding: false }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { rightHiding: false },
      expectedState: { rightHiding: false }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { rightHiding: true },
      expectedState: { rightHiding: false }
    }
  ],
  [shoot]: [
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: false, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: null, rightHiding: null, gameStatus: ended, winner: leftPlayer }
    },
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: false, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: false, rightHiding: true, gameStatus: afoot }
    },
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: true, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: false, gameStatus: afoot }
    },
    {
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: true, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: afoot }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { leftHiding: false, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: null, rightHiding: null, gameStatus: ended, winner: rightPlayer }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { leftHiding: false, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: false, rightHiding: true, gameStatus: afoot }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { leftHiding: true, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: false, gameStatus: afoot }
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { leftHiding: true, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: afoot }
    }
  ]
}

Object.getOwnPropertySymbols(testsForActionName).forEach(name => {
  const tests = testsForActionName[name]
  tests.forEach(({currentState, expectedState, payload}, index) => {
    test(`\`${String(name)}\` test ${index}; state: ${stringFromObject(currentState)}; payload: ${stringFromObject(payload)}`, t => {
      const actual = stateMachine(currentState, Object.assign({ [actionNameKey]: name }, payload))
      t.deepEqual(actual, expectedState)
    })
  })
})

const impossibleStatesForActionName = {
  [startGame]: [
    { gameStatus: afoot },
    { gameStatus: ended }
  ],
  [shoot]: [
    { gameStatus: idle },
    { gameStatus: ended }
  ]
}

Object.getOwnPropertySymbols(impossibleStatesForActionName).forEach(name => {
  const states = impossibleStatesForActionName[name]
  states.forEach(state => {
    test(`\`${String(name)}\` throws on impossible state ${stringFromObject(state)}`, t => {
      t.throws(
        () => { stateMachine(state, { [actionNameKey]: name }) },
        'Impossible action at current state')
    })
  })
})
