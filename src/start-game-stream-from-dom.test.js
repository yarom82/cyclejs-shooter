const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const xstreamAdapter = require('@cycle/xstream-adapter').default

const startGame$FromDOM = require('./start-game-stream-from-dom')

test('emits \'START\' for clicks on `startGameButton`’s exported selector', t => {
  t.plan(1)

  const { selector } = require('./ui-from-state/start-game-button')

  const DOMMock = mockDOMSource(xstreamAdapter, {
    [selector]: {
      'click': xs.of(null)
    }
  })

  startGame$FromDOM(DOMMock)
    .addListener({next: start => {
      t.is(start, 'START_GAME')
    }})
})
