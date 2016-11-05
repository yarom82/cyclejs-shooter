const stateMachine = require('./state-machine')
const { test } = require('ava')
const stringifyObject = require('stringify-object')
const stringifyOptions = {
  inlineCharacterLimit: 999
}

const testsForAction = {
  'START_GAME': [
    {
      currentState: { started: false },
      expectedState: { started: true }
    }
  ],
  'LEFT_HIDE': [
    {
      currentState: { leftHiding: false },
      expectedState: { leftHiding: true }
    },
    {
      currentState: { leftHiding: true },
      expectedState: { leftHiding: true }
    }
  ],
  'LEFT_UNHIDE': [
    {
      currentState: { leftHiding: false },
      expectedState: { leftHiding: false }
    },
    {
      currentState: { leftHiding: true },
      expectedState: { leftHiding: false }
    }
  ],
  'RIGHT_HIDE': [
    {
      currentState: { rightHiding: false },
      expectedState: { rightHiding: true }
    },
    {
      currentState: { rightHiding: true },
      expectedState: { rightHiding: true }
    }
  ],
  'RIGHT_UNHIDE': [
    {
      currentState: { rightHiding: false },
      expectedState: { rightHiding: false }
    },
    {
      currentState: { rightHiding: true },
      expectedState: { rightHiding: false }
    }
  ],
  'LEFT_SHOOT': [
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
  'RIGHT_SHOOT': [
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
  'START_GAME': [
    { started: true }
  ],
  'LEFT_SHOOT': [
    { winner: 'LEFT_PLAYER' },
    { winner: 'RIGHT_PLAYER' }
  ],
  'RIGHT_SHOOT': [
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
