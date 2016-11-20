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
    shoot
  },
  actionPayloadKeys: {
    player
  },
  players: {
    leftPlayer,
    rightPlayer
  }
} = require('./constants')
const actionNameKey = require('./action').nameKey

const expectedDataForEventAndKey = {
  'keypress': {
    'z': { [actionNameKey]: shoot, [player]: leftPlayer },
    '/': { [actionNameKey]: shoot, [player]: rightPlayer }
  },
  'keydown': {
    'a': { [actionNameKey]: leftHide },
    '\'': { [actionNameKey]: rightHide }
  },
  'keyup': {
    'a': { [actionNameKey]: leftUnhide },
    '\'': { [actionNameKey]: rightUnhide }
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
          t.deepEqual(action, expectedAction)
        }})
    })
  }
}
