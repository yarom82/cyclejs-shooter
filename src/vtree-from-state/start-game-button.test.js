const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { button } = require('@cycle/dom')
const requireUncached = require('require-uncached')
const cuid = require('cuid')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')

const cuidSpyReturn = cuid()
const cuidMocks = mockPathWithSimpleSpy('cuid', cuidSpyReturn)

test.beforeEach((t) => {
  t.context.cuidMock = cuidMocks.next().value
  t.context.subject = requireUncached(modulePath)
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
  t.true(isEqual(t.context.cuidMock.args, [[]]))
})

test('exports its unique selector', t => {
  t.is(t.context.subject.selector, `[data-id='${cuidSpyReturn}']`)
})
