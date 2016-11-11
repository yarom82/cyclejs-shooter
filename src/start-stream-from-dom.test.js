const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const start$FromDOM = require('./start-stream-from-dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  selectorPrefixes: {
    action
  }
} = require('./constants')

test(`emits 'START' for clicks on \`.${action}:START\``, t => {
  t.plan(1)

  const DOMMock = mockDOMSource(xstreamAdapter, {
    [`.${action}:START`]: {
      'click': xs.of(null)
    }
  })

  start$FromDOM(DOMMock)
    .addListener({next: start => {
      t.is(start, 'START')
    }})
})
