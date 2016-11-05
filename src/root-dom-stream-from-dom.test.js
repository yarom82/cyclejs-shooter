const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const rootDOM$FromDOM = require('./root-dom-stream-from-dom')
const xs = require('xstream').default

test('selects the root DOM', t => {
  t.plan(1)
  const rootDOMStub = Symbol()
  const DOMMock = mockDOMSource(xstreamAdapter, {
    ':root': {
      elements: xs.of(rootDOMStub)
    }
  })

  rootDOM$FromDOM(DOMMock)
    .elements()
    .addListener({next: rootDOM => {
      t.is(rootDOM, rootDOMStub)
    }})
})
