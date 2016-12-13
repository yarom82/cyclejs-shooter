const { test } = require('ava')
const { button } = require('@cycle/dom')
const h = require('./h')
const { spy } = require('simple-spy')
const mock = require('mock-require')
const requireNew = require('require-new')
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
  const expected = h('start-game-button',
    {
      attrs: {
        'data-id': cuidStubReturn
      },
      style: {
        textTransform: 'uppercase'
      }
    },
    [
      button('Start the game')
    ]
  )

  t.deepEqual(startGameButton(), expected)
})

test('`cuid` called once with no args', t => {
  requireNew(modulePath)
  t.deepEqual(cuidSpy.args, [[]])
})

test('exports its unique selector', t => {
  t.is(startGameButton.selector, `[data-id='${cuidStubReturn}']`)
})
