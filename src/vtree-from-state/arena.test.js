const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mock = require('mock-require')
const h = require('./h')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const { spy } = require('simple-spy')
const cuid = require('cuid')
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  t.context.cuidMock = {}
  t.context.cuidMock.stubReturn = cuid()
  t.context.cuidMock.spy = spy(() => t.context.cuidMock.stubReturn)
  mock('cuid', t.context.cuidMock.spy)

  t.context.focusOnElmOfVnodeMock = Symbol('./focus-on-elm-of-vnode')
  mock('./focus-on-elm-of-vnode', t.context.focusOnElmOfVnodeMock)

  t.context.playerMock = mockPathWithSpyThatReturnsSymbolHere('./player')
  t.context.barrierMock = mockPathWithSpyThatReturnsSymbolHere('./barrier')

  t.context.subject = requireUncached('./arena')
})

const arenaArgs = [
  Symbol('leftHiding'),
  Symbol('rightHiding')
]

test('vtree', t => {
  const expectedVtree = h('arena',
    {
      attrs: {
        'data-id': t.context.cuidMock.stubReturn,
        tabindex: 0
      },
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '60px'
      },
      hook: {
        insert: t.context.focusOnElmOfVnodeMock
      }
    },
    [
      t.context.playerMock.returnSymbol,
      t.context.barrierMock.returnSymbol,
      t.context.playerMock.returnSymbol
    ]
  )

  const actualVtree = t.context.subject()
  t.true(isEqual(actualVtree, expectedVtree))
})

test('`player` descendants calls args', t => {
  const expectedPlayerCallsArgs = [
    ['left', arenaArgs[0]],
    ['right', arenaArgs[1]]
  ]
  t.context.subject(...arenaArgs)
  t.true(isEqual(t.context.playerMock.spy.args, expectedPlayerCallsArgs))
})

test('`barrier` descendant calls without args', t => {
  const expected = [
    []
  ]
  t.context.subject(...arenaArgs)
  t.true(isEqual(t.context.barrierMock.spy.args, expected))
})

test('exports its unique selector', t => {
  t.is(t.context.subject.selector, `[data-id='${t.context.cuidMock.stubReturn}']`)
})
