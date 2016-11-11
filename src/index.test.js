const { test } = require('ava')
const main = require('.')
const { mockDOMSource } = require('@cycle/dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default

test('given a DOMDriver emits some initial vtree', t => {
  t.plan(1)
  const DOMMock = mockDOMSource(xstreamAdapter, {})
  const { DOM } = main({ DOM: DOMMock })
  DOM.addListener({next: vtree => {
    // if there’s an official way to test
    // whether an object is a vnode
    // we should use that, instead of this.
    t.truthy(vtree.sel)
  }})
})
