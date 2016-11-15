const stateMachine = require('./state-machine')
const { test } = require('ava')
const stringifyObject = require('stringify-object')
const stringifyOptions = {
  inlineCharacterLimit: 999
}
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
    leftShoot,
    rightShoot
  },
  players: {
    leftPlayer,
    rightPlayer
  }
} = require('./constants')

const testsForAction = {
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
  [leftShoot]: [
    {
      currentState: { leftHiding: false, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: null, rightHiding: null, gameStatus: ended, winner: leftPlayer }
    },
    {
      currentState: { leftHiding: false, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: false, rightHiding: true, gameStatus: afoot }
    },
    {
      currentState: { leftHiding: true, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: false, gameStatus: afoot }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: afoot }
    }
  ],
  [rightShoot]: [
    {
      currentState: { leftHiding: false, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: null, rightHiding: null, gameStatus: ended, winner: rightPlayer }
    },
    {
      currentState: { leftHiding: false, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: false, rightHiding: true, gameStatus: afoot }
    },
    {
      currentState: { leftHiding: true, rightHiding: false, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: false, gameStatus: afoot }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, gameStatus: afoot },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: afoot }
    }
  ]
}

for (const action in testsForAction) {
  const tests = testsForAction[action]
  tests.forEach(({currentState, expectedState}, index) => {
    test(`action ${action} with state index ${index}: ${stringifyObject(currentState, stringifyOptions)}`, t => {
      const actual = stateMachine(currentState, action)
      t.deepEqual(actual, expectedState)
    })
  })
}

const impossibleStatesOfAction = {
  [startGame]: [
    { gameStatus: afoot },
    { gameStatus: ended }
  ],
  [leftShoot]: [
    { gameStatus: idle },
    { gameStatus: ended }
  ],
  [rightShoot]: [
    { gameStatus: idle },
    { gameStatus: ended }
  ]
}

for (const action in impossibleStatesOfAction) {
  const states = impossibleStatesOfAction[action]
  states.forEach((state, index) => {
    test(`${action} throws on impossible state ${index}`, t => {
      t.throws(
        () => { stateMachine(state, action) },
        'Impossible action at current state')
    })
  })
}
