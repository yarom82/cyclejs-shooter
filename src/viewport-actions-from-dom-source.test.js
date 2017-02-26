const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const viewportActionsFromDOMSource = require('./viewport-actions-from-dom-source')
const stringFromObject = require('../utils/single-line-string-from-object')
const {
  actionNames: {
    hide,
    unhide,
    shoot,
    pause
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
    '\'': { [actionNameKey]: hide, [player]: rightPlayer },
    'p': { [actionNameKey]: pause }
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
    test(`emits ${stringFromObject(expectedAction)} for ${event} ${key} on \`viewport\`’s exported selector`, t => {
      t.plan(1)

      const { selector } = require('./vtree-from-state/viewport')

      const DOMSourceMock = mockDOMSource({
        [selector]: {
          [event]: xs.of({key})
        }
      })

      viewportActionsFromDOMSource(DOMSourceMock)
        .addListener({next: action => {
          t.true(isEqual(action, expectedAction))
        }})
    })
  }
}
