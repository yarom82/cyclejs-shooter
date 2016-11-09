const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const startGame$FromDOM = require('./start-game-stream-from-dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default

test('emits \'START\' for clicks on `.ACTION:START`', t => {
  t.plan(1)

  const DOMMock = mockDOMSource(xstreamAdapter, {
    '.ACTION:START_GAME': {
      'click': xs.of(null)
    }
  })

  startGame$FromDOM(DOMMock)
    .debug()
    .addListener({next: start => {
      t.is(start, 'START_GAME')
    }})
})
