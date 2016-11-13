const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const xstreamAdapter = require('@cycle/xstream-adapter').default
const mock = require('mock-require')
const cuid = require('cuid')

const className = cuid()
mock('./ui-from-state/start-game-button', { className })

const startGame$FromDOM = require('./start-game-stream-from-dom')

test('emits \'START\' for clicks on `startGameButton`', t => {
  t.plan(1)

  const DOMMock = mockDOMSource(xstreamAdapter, {
    [`.${className}`]: {
      'click': xs.of(null)
    }
  })

  startGame$FromDOM(DOMMock)
    .debug()
    .addListener({next: start => {
      t.is(start, 'START_GAME')
    }})
})
