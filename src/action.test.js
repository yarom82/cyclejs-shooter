const { test } = require('ava')
const isSubset = require('is-subset')
const action = require('./action')
const {
  isPlainObject,
  isFunction
} = require('typechecker')

test('is a function', t => {
  t.true(isFunction(action))
})

test('of arity 2', t => {
  t.is(action.length, 2)
})

test('returns a plain object', t => {
  t.true(isPlainObject(action()))
})

test('returned object is frozen', t => {
  t.true(Object.isFrozen(action()))
})

test('returned object is not the payload', t => {
  const payload = {}
  t.not(action(undefined, payload), payload)
})

test('`nameKey` property is a symbol', t => {
  t.is(typeof action.nameKey, 'symbol')
})

test('returned object’s name is the provided `name`', t => {
  const name = Symbol('name')
  const actual = action(name)
  t.is(actual[action.nameKey], name)
})

test('returned object is superset of payload', t => {
  const payload = { [Symbol('key')]: undefined }
  const actual = action(undefined, payload)
  t.true(isSubset(actual, payload))
})
