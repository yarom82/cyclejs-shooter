const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const startGame$FromDOM = require('./start-game-stream-from-dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  selectorPrefixes: {
    action
  },
  actionNames: {
    startGame
  }
} = require('./constants')

const selector = `.${action}:${startGame}`
test(`emits '${startGame}' for clicks on \`${selector}\``, t => {
  t.plan(1)

  const DOMMock = mockDOMSource(xstreamAdapter, {
    [selector]: {
      'click': xs.of(null)
    }
  })

  startGame$FromDOM(DOMMock)
    .addListener({next: value => {
      t.is(value, startGame)
    }})
})
