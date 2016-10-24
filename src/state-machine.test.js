const stateMachine = require('./state-machine')
const { test } = require('ava')

const actionTests = {
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
      expectedState: { leftHiding: false, rightHiding: false, winner: 'LEFT_PLAYER' }
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
      expectedState: { leftHiding: false, rightHiding: false, winner: 'RIGHT_PLAYER' }
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

test('stateMachine', t => {
  for (const action in actionTests) {
    const tests = actionTests[action]
    tests.forEach((test, index) => {
      const actual = stateMachine(test.currentState, action)
      t.deepEqual(
        actual,
        test.expectedState,
        `Test index ${index} of action ${action}`)
    })
  }
})
