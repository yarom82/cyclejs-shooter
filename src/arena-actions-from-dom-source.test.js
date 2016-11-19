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
    'z': leftShoot,
    '/': rightShoot
  },
  'keydown': {
    'a': leftHide,
    '\'': rightHide
  },
  'keyup': {
    'a': leftUnhide,
    '\'': rightUnhide
  }
}

for (const event in expectedDataForEventAndKey) {
  const keys = expectedDataForEventAndKey[event]
  for (const key in keys) {
    const expectedAction = keys[key]
    test(`emits ${expectedAction} for ${event} ${key} on \`arena\`’s exported selector`, t => {
      t.plan(1)

      const { selector } = require('./vtree-from-state/arena')

      const DOMSourceMock = mockDOMSource(xstreamAdapter, {
        [selector]: {
          [event]: xs.of({key})
        }
      })

      arenaActionsFromDOMSource(DOMSourceMock)
        .addListener({next: action => {
          t.is(action, expectedAction)
        }})
    })
  }
}
