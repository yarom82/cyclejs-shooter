const { test } = require('ava')
const { mockDOMSource } = require('@cycle/dom')
const xs = require('xstream').default
const start$FromDOM = require('./start-stream-from-dom')
const xstreamAdapter = require('@cycle/xstream-adapter').default
const {
  selectorPrefixes: {
    action
  },
  actionNames: {
    start
  }
} = require('./constants')

const selector = `.${action}:${start}`
test(`emits '${start}' for clicks on \`${selector}\``, t => {
  t.plan(1)

  const DOMMock = mockDOMSource(xstreamAdapter, {
    [selector]: {
      'click': xs.of(null)
    }
  })

  start$FromDOM(DOMMock)
    .addListener({next: value => {
      t.is(value, start)
    }})
})
