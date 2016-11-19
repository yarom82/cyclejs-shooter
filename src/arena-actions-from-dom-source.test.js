const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const arenaActionsFromDOMSource = require('./arena-actions-from-dom-source')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  actionNames: {
    leftHide,
    rightHide,
    leftUnhide,
    rightUnhide,
    leftShoot,
    rightShoot
  }
} = require('./constants')

const expectedDataForEventAndKey = {
  'keypress': {
    'z': { name: leftShoot },
    '/': { name: rightShoot }
  },
  'keydown': {
    'a': { name: leftHide },
    '\'': { name: rightHide }
  },
  'keyup': {
    'a': { name: leftUnhide },
    '\'': { name: rightUnhide }
  }
}

for (const event in expectedDataForEventAndKey) {
  const keys = expectedDataForEventAndKey[event]
  for (const key in keys) {
    const expectedAction = keys[key]
    test(`emits ${expectedAction} for ${event} ${key} on '.arena'`, t => {
      t.plan(1)

      const DOMSourceMock = mockDOMSource(xstreamAdapter, {
        '.arena': {
          [event]: xs.of({key})
        }
      })

      arenaActionsFromDOMSource(DOMSourceMock)
        .addListener({next: action => {
          t.deepEqual(action, expectedAction)
        }})
    })
  }
}
