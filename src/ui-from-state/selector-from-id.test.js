const { test } = require('ava')
const selectorFromId = require('./selector-from-id')
const cuid = require('cuid')

test('returns a `[data-id]` selector for provided id', t => {
  const id = cuid()
  const expected = `[data-id='${id}']`
  t.is(selectorFromId(id), expected)
})
