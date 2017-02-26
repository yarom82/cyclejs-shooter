const stateMachine = require('./state-machine')
const { test } = require('ava')
const stringFromObject = require('../utils/single-line-string-from-object')
const {
  gameStatus: {
    idle,
    afoot,
    ended,
    paused
  },
  actionNames: {
    startGame,
    hide,
    unhide,
    shoot,
    pause
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
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: false, gameStatus: paused },
      expectedState: { leftHiding: false, gameStatus: paused }
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
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { rightHiding: false, gameStatus: paused },
      expectedState: { rightHiding: false, gameStatus: paused }
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
      payload: { [player]: leftPlayer },
      currentState: { leftHiding: true, gameStatus: paused },
      expectedState: { leftHiding: true, gameStatus: paused }
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
    },
    {
      payload: { [player]: rightPlayer },
      currentState: { rightHiding: true, gameStatus: paused },
      expectedState: { rightHiding: true, gameStatus: paused }
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
      currentState: { leftHiding: false, rightHiding: false, gameStatus: paused },
      expectedState: { leftHiding: false, rightHiding: false, gameStatus: paused }
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
      currentState: { leftHiding: false, rightHiding: false, gameStatus: paused },
      expectedState: { leftHiding: false, rightHiding: false, gameStatus: paused }
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
  ],
  [pause]: [
    {
      currentState: { leftHiding: false, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: false, rightHiding: false, gameStatus: paused }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: paused }
    },
    {
      currentState: { leftHiding: false, rightHiding: false, gameStatus: paused },
      expectedState: { leftHiding: false, rightHiding: false, gameStatus: afoot }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, gameStatus: paused },
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
    { gameStatus: ended },
    { gameStatus: paused }
  ],
  [shoot]: [
    { gameStatus: idle },
    { gameStatus: ended }
  ],
  [pause]: [
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
