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
    leftShoot,
    rightShoot
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

for (const name in testsForActionName) {
  const tests = testsForActionName[name]
  tests.forEach(({currentState, expectedState}, index) => {
    test(`action ${name} with state index ${index}: ${stringFromObject(currentState)}`, t => {
      const actual = stateMachine(currentState, { [actionNameKey]: name })
      t.deepEqual(actual, expectedState)
    })
  })
}

const impossibleStatesForActionName = {
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
