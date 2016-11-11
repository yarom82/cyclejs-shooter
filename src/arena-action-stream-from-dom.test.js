const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const arenaAction$FromDOM = require('./arena-action-stream-from-dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  actionNames: {
    leftHide
  }
} = require('./constants')

const expectedDataForEventAndKey = {
  'keypress': {
    'z': 'LEFT_SHOOT',
    '/': 'RIGHT_SHOOT'
  },
  'keydown': {
    'a': leftHide,
    '\'': 'RIGHT_HIDE'
  },
  'keyup': {
    'a': 'LEFT_UNHIDE',
    '\'': 'RIGHT_UNHIDE'
  }
}

for (const event in expectedDataForEventAndKey) {
  const keys = expectedDataForEventAndKey[event]
  for (const key in keys) {
    const expectedAction = keys[key]
    test(`emits ${expectedAction} for ${event} ${key} on '.arena'`, t => {
      t.plan(1)

      const DOMMock = mockDOMSource(xstreamAdapter, {
        '.arena': {
          [event]: xs.of({key})
        }
      })

      arenaAction$FromDOM(DOMMock)
        .addListener({next: action => {
          t.is(action, expectedAction)
        }})
    })
  }
}
