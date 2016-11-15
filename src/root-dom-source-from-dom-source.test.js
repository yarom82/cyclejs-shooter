const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const rootDOMSourceFromDOMSource = require('./root-dom-source-from-dom-source')
const xs = require('xstream').default

test('selects the root DOM', t => {
  t.plan(1)
  const rootDOMStub = Symbol()
  const DOMMock = mockDOMSource(xstreamAdapter, {
    ':root': {
      elements: xs.of(rootDOMStub)
    }
  })

  rootDOMSourceFromDOMSource(DOMMock)
    .elements()
    .addListener({next: rootDOM => {
      t.is(rootDOM, rootDOMStub)
    }})
})
