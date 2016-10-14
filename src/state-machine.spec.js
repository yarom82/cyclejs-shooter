const assert = require('assert')
const stateMachine = require('./state-machine')

const actionTests = {
  'LEFT_DOWN': [
    {
      currentState: { leftPlayerDown: false },
      expectedState: { leftPlayerDown: true }
    },
    {
      currentState: { leftPlayerDown: true },
      expectedState: { leftPlayerDown: true }
    }
  ],
  'LEFT_UP': [
    {
      currentState: { leftPlayerDown: false },
      expectedState: { leftPlayerDown: false }
    },
    {
      currentState: { leftPlayerDown: true },
      expectedState: { leftPlayerDown: false }
    }
  ],
  'RIGHT_DOWN': [
    {
      currentState: { rightPlayerDown: false },
      expectedState: { rightPlayerDown: true }
    },
    {
      currentState: { rightPlayerDown: true },
      expectedState: { rightPlayerDown: true }
    }
  ],
  'RIGHT_UP': [
    {
      currentState: { rightPlayerDown: false },
      expectedState: { rightPlayerDown: false }
    },
    {
      currentState: { rightPlayerDown: true },
      expectedState: { rightPlayerDown: false }
    }
  ]
}

for (const action in actionTests) {
  actionTests[action].forEach((test, index) => {
    const actual = stateMachine(test.currentState, action)
    assert.deepStrictEqual(
      actual,
      test.expectedState,
      `Test index ${index} of action ${action}`)
  })
}
