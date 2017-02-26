const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  t.context.subject = requireUncached('.')
})

test('given a DOMSource emits some initial vtree', t => {
  t.plan(1)
  const DOMSourceMock = mockDOMSource({})
  const { DOM: vtree$ } = t.context.subject({ DOM: DOMSourceMock })
  vtree$.addListener({next: vtree => {
    // if there’s an official way to test
    // whether an object is a vnode
    // we should use that, instead of this.
    t.truthy(vtree.sel)
  }})
})
