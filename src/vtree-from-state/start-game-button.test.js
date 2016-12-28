const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { button } = require('@cycle/dom')
const requireUncached = require('require-uncached')
const cuid = require('cuid')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')

const cuidSpyReturn = cuid()

test.beforeEach((t) => {
  t.context.cuidMock = mockPathWithSpy('cuid', cuidSpyReturn)
  t.context.subject = require(modulePath)
})

const modulePath = './start-game-button'

test('vtree', t => {
  const expected = button(
    {
      attrs: {
        'data-id': cuidSpyReturn
      },
      style: {
        textTransform: 'uppercase'
      }
    },
    'Start the game'
  )

  t.true(isEqual(t.context.subject(), expected))
})

test('`cuid` called once with no args', t => {
  requireUncached(modulePath)
  t.true(isEqual(t.context.cuidMock.spy.args, [[]]))
})

test('exports its unique selector', t => {
  t.is(t.context.subject.selector, `[data-id='${cuidSpyReturn}']`)
})
