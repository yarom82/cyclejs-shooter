const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const rootDOMSourceFromDOMSource = require('./root-dom-source-from-dom-source')
const xs = require('xstream').default

test('selects the root DOM', t => {
  t.plan(1)
  const rootDOMStub = Symbol()
  const DOMSourceMock = mockDOMSource({
    ':root': {
      elements: xs.of(rootDOMStub)
    }
  })

  rootDOMSourceFromDOMSource(DOMSourceMock)
    .elements()
    .addListener({next: rootDOM => {
      t.is(rootDOM, rootDOMStub)
    }})
})
