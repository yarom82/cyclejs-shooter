const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const startGame$FromDOMSource = require('./start-game-stream-from-dom-source')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  actionNames: {
    startGame
  }
} = require('./constants')

test(`emits '${startGame}' for clicks on \`startGameButton\`’s exported selector`, t => {
  t.plan(1)

  const { selector } = require('./vtree-from-state/start-game-button')

  const DOMSourceMock = mockDOMSource(xstreamAdapter, {
    [selector]: {
      'click': xs.of(null)
    }
  })

  startGame$FromDOMSource(DOMSourceMock)
    .addListener({next: value => {
      t.is(value, startGame)
    }})
})
