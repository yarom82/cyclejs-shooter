const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  t.context.subject = requireUncached('.')
})

test('given a DOMSource emits some initial vtree', t => {
  t.plan(1)
  const DOMSourceMock = mockDOMSource(xstreamAdapter, {})
  const { DOM: vtree$ } = t.context.subject({ DOM: DOMSourceMock })
  vtree$.addListener({next: vtree => {
    // if there’s an official way to test
    // whether an object is a vnode
    // we should use that, instead of this.
    t.truthy(vtree.sel)
  }})
})
