const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const startGameActionsFromDOM = require('./start-game-actions-from-dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  actionNames: {
    startGame
  }
} = require('./constants')

test(`emits '${startGame}' for clicks on \`startGameButton\`’s exported selector`, t => {
  t.plan(1)

  const { selector } = require('./ui-from-state/start-game-button')

  const DOMMock = mockDOMSource(xstreamAdapter, {
    [selector]: {
      'click': xs.of(null)
    }
  })

  startGameActionsFromDOM(DOMMock)
    .addListener({next: value => {
      t.is(value, startGame)
    }})
})
