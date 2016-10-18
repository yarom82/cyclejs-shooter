const assert = require('assert')
const stateMachine = require('./state-machine')

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
  ]
}

for (const action in actionTests) {
  const tests = actionTests[action]
  tests.forEach((test, index) => {
    const actual = stateMachine(test.currentState, action)
    assert.deepStrictEqual(
      actual,
      test.expectedState,
      `Test index ${index} of action ${action}`)
  })
}
