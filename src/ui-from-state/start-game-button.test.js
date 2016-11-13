const { test } = require('ava')
const { button } = require('@cycle/dom')
const { spy } = require('simple-spy')
const mock = require('mock-require')
const requireNew = require('require-new')

const cuidStubReturn = Symbol('cuidStub')
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
      class: {
        [cuidStubReturn]: true
      },
      style: {
        textTransform: 'uppercase'
      }
    },
    'Start the game'
  )

  t.deepEqual(startGameButton(), expected)
})

test('`cuid` descendant called once with no args', t => {
  requireNew(modulePath)
  t.deepEqual(cuidSpy.args, [[]])
})

test('exports its unique className', t => {
  t.is(startGameButton.className, cuidStubReturn)
})
