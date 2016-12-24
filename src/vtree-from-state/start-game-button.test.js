const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { button } = require('@cycle/dom')
const { spy } = require('simple-spy')
const mock = require('mock-require')
const requireUncached = require('require-uncached')
const cuid = require('cuid')

const cuidStubReturn = cuid()
const cuidStub = () => cuidStubReturn
const cuidSpy = spy(cuidStub)
mock('cuid', cuidSpy)

test.beforeEach(() => {
  cuidSpy.reset()
})

const modulePath = './start-game-button'
const startGameButton = require(modulePath)

test('vtree', t => {
  const expected = button(
    {
      attrs: {
        'data-id': cuidStubReturn
      },
      style: {
        textTransform: 'uppercase'
      }
    },
    'Start the game'
  )

  t.true(isEqual(startGameButton(), expected))
})

test('`cuid` called once with no args', t => {
  requireUncached(modulePath)
  t.true(isEqual(cuidSpy.args, [[]]))
})

test('exports its unique selector', t => {
  t.is(startGameButton.selector, `[data-id='${cuidStubReturn}']`)
})
