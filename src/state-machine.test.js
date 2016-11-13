const stateMachine = require('./state-machine')
const { test } = require('ava')
const stringifyObject = require('stringify-object')
const stringifyOptions = {
  inlineCharacterLimit: 999
}

const testsForAction = {
  'START_GAME': [
    {
      currentState: { gameStatus: 'IDLE' },
      expectedState: { gameStatus: 'AFOOT' }
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
      currentState: { leftHiding: false, rightHiding: false, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: null, rightHiding: null, gameStatus: 'ENDED', winner: 'LEFT_PLAYER' }
    },
    {
      currentState: { leftHiding: false, rightHiding: true, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: false, rightHiding: true, gameStatus: 'AFOOT' }
    },
    {
      currentState: { leftHiding: true, rightHiding: false, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: true, rightHiding: false, gameStatus: 'AFOOT' }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: 'AFOOT' }
    }
  ],
  'RIGHT_SHOOT': [
    {
      currentState: { leftHiding: false, rightHiding: false, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: null, rightHiding: null, gameStatus: 'ENDED', winner: 'RIGHT_PLAYER' }
    },
    {
      currentState: { leftHiding: false, rightHiding: true, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: false, rightHiding: true, gameStatus: 'AFOOT' }
    },
    {
      currentState: { leftHiding: true, rightHiding: false, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: true, rightHiding: false, gameStatus: 'AFOOT' }
    },
    {
      currentState: { leftHiding: true, rightHiding: true, gameStatus: 'AFOOT' },
      expectedState: { leftHiding: true, rightHiding: true, gameStatus: 'AFOOT' }
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
    { gameStatus: 'AFOOT' },
    { gameStatus: 'ENDED' }
  ],
  'LEFT_SHOOT': [
    { gameStatus: 'IDLE' },
    { gameStatus: 'ENDED' }
  ],
  'RIGHT_SHOOT': [
    { gameStatus: 'IDLE' },
    { gameStatus: 'ENDED' }
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
