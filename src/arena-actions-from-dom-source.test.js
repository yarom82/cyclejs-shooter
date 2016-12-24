const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const arenaActionsFromDOMSource = require('./arena-actions-from-dom-source')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const stringFromObject = require('../utils/single-line-string-from-object')
const {
  actionNames: {
    hide,
    unhide,
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
  'keydown': {
    'z': { [actionNameKey]: shoot, [player]: leftPlayer },
    '/': { [actionNameKey]: shoot, [player]: rightPlayer },
    'a': { [actionNameKey]: hide, [player]: leftPlayer },
    '\'': { [actionNameKey]: hide, [player]: rightPlayer }
  },
  'keyup': {
    'a': { [actionNameKey]: unhide, [player]: leftPlayer },
    '\'': { [actionNameKey]: unhide, [player]: rightPlayer }
  }
}

for (const event in expectedDataForEventAndKey) {
  const keys = expectedDataForEventAndKey[event]
  for (const key in keys) {
    const expectedAction = keys[key]
    test(`emits ${stringFromObject(expectedAction)} for ${event} ${key} on \`arena\`’s exported selector`, t => {
      t.plan(1)

      const { selector } = require('./vtree-from-state/arena')

      const DOMSourceMock = mockDOMSource(xstreamAdapter, {
        [selector]: {
          [event]: xs.of({key})
        }
      })

      arenaActionsFromDOMSource(DOMSourceMock)
        .addListener({next: action => {
          t.true(isEqual(action, expectedAction))
        }})
    })
  }
}
