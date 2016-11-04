const { test } = require('ava')
const keyFromEvent = require('./key-from-event')

test('returns provided object’s key property value', t => {
  const obj = {key: Symbol()}
  const actual = keyFromEvent(obj)
  t.is(actual, obj.key)
})
