const { test } = require('ava')
const arenaDOM$FromDOM = require('./arena-dom-stream-from-dom.js')
const { mockDOMSource } = require('@cycle/dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const xs = require('xstream').default

test('selects the arena', t => {
  t.plan(1)

  const arenaDOMStub = Symbol()
  const DOMMock = mockDOMSource(xstreamAdapter, {
    ':root .arena': {
      elements: xs.of(arenaDOMStub)
    }
  })

  arenaDOM$FromDOM(DOMMock)
    .elements()
    .addListener({next: arenaDOM => {
      t.is(arenaDOM, arenaDOMStub)
    }})
})
