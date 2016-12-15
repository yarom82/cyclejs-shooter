const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const startGameActionsFromDOMSource = require('./start-game-actions-from-dom-source')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  actionNames: {
    startGame
  }
} = require('./constants')
const actionNameKey = require('./action').nameKey

test(`emits \`${String(startGame)}\` for clicks on \`startGameButton\`’s exported selector`, t => {
  t.plan(1)

  const { selector } = require('./vtree-from-state/start-game-button')

  const DOMSourceMock = mockDOMSource(xstreamAdapter, {
    [selector]: {
      'click': xs.of(null)
    }
  })

  startGameActionsFromDOMSource(DOMSourceMock)
    .addListener({next: value => {
      t.deepEqual(value, { [actionNameKey]: startGame })
    }})
})
