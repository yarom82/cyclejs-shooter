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
    leftHide,
    rightHide,
    leftUnhide,
    rightUnhide,
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
  [leftHide]: [
    {
      currentState: { leftHiding: false },
      expectedState: { leftHiding: true }
    },
    {
      currentState: { leftHiding: true },
      expectedState: { leftHiding: true }
    }
  ],
  [leftUnhide]: [
    {
      currentState: { leftHiding: false },
      expectedState: { leftHiding: false }
    },
    {
      currentState: { leftHiding: true },
      expectedState: { leftHiding: false }
    }
  ],
  [rightHide]: [
    {
      currentState: { rightHiding: false },
      expectedState: { rightHiding: true }
    },
    {
      currentState: { rightHiding: true },
      expectedState: { rightHiding: true }
    }
  ],
  [rightUnhide]: [
    {
      currentState: { rightHiding: false },
      expectedState: { rightHiding: false }
    },
    {
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

for (const name in testsForActionName) {
  const tests = testsForActionName[name]
  tests.forEach(({currentState, expectedState, payload}, index) => {
    test(`action ${name} with state index ${index}: ${stringFromObject(currentState)} ${payload ? ' payload:' + stringFromObject(payload) : ''}`, t => {
      const actual = stateMachine(currentState, Object.assign({ [actionNameKey]: name }, payload))
      t.deepEqual(actual, expectedState)
    })
  })
}

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

for (const name in impossibleStatesForActionName) {
  const states = impossibleStatesForActionName[name]
  states.forEach((state, index) => {
    test(`${name} throws on impossible state ${index}`, t => {
      t.throws(
        () => { stateMachine(state, { [actionNameKey]: name }) },
        'Impossible action at current state')
    })
  })
}
