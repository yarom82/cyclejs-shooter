const { test } = require('ava')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const h = require('./h')
const requireUncached = require('require-uncached')
const isEqual = require('lodash.isequal')

test.beforeEach((t) => {
  t.context.arenaMock = mockPathWithSpyThatReturnsSymbolHere('./arena')
  t.context.subject = requireUncached('./viewport')
})

test('exports a function of arity 2', (t) => {
  t.is(typeof t.context.subject, 'function')
  t.is(t.context.subject.length, 2)
})

test('vtree', (t) => {
  const expected = h('viewport',
    {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    },
    [
      t.context.arenaMock.returnSymbol
    ]
  )

  const actual = t.context.subject()

  t.true(isEqual(actual, expected))
})

test('`arena` is called once', (t) => {
  t.context.subject()
  t.is(t.context.arenaMock.spy.args.length, 1)
})

test('`arena` call args', (t) => {
  const args = [Symbol('leftHiding'), Symbol('rightHiding')]
  t.context.subject(...args)
  t.deepEqual(t.context.arenaMock.spy.args[0], args)
})
