const stateMachine = require('./state-machine')
const { test } = require('ava')
const stringifyObject = require('stringify-object')
const stringifyOptions = {
  inlineCharacterLimit: 999
}
const {
  actionNames: {
    start,
    leftHide,
    rightHide,
    leftUnhide,
    rightUnhide,
    leftShoot,
    rightShoot
  }
} = require('./constants')

const testsForAction = {
  [start]: [
    {
      currentState: { started: false },
      expectedState: { started: true }
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
      currentState: { leftHiding: false, rightHiding: false, winner: null },
      expectedState: { leftHiding: null, rightHiding: null, winner: 'LEFT_PLAYER' }
    },
    {
      currentState: { leftHiding: false, rightHiding: true, winner: null },
      expectedState: { leftHiding: false, rightHiding: true, winner: null }
    },
    {
      currentState: { leftHiding: true, rightHiding: false, winner: null },
      expectedState: { leftHiding: true, rightHiding: false, winner: null }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, winner: null },
      expectedState: { leftHiding: true, rightHiding: true, winner: null }
    }
  ],
  [rightShoot]: [
    {
      currentState: { leftHiding: false, rightHiding: false, winner: null },
      expectedState: { leftHiding: null, rightHiding: null, winner: 'RIGHT_PLAYER' }
    },
    {
      currentState: { leftHiding: false, rightHiding: true, winner: null },
      expectedState: { leftHiding: false, rightHiding: true, winner: null }
    },
    {
      currentState: { leftHiding: true, rightHiding: false, winner: null },
      expectedState: { leftHiding: true, rightHiding: false, winner: null }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, winner: null },
      expectedState: { leftHiding: true, rightHiding: true, winner: null }
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
  [start]: [
    { started: true }
  ],
  [leftShoot]: [
    { winner: 'LEFT_PLAYER' },
    { winner: 'RIGHT_PLAYER' }
  ],
  [rightShoot]: [
    { winner: 'LEFT_PLAYER' },
    { winner: 'RIGHT_PLAYER' }
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
