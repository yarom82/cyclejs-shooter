const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mock = require('mock-require')
const h = require('./h')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')
const { spy } = require('simple-spy')
const cuid = require('cuid')
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  t.context.cuidMock = {}
  t.context.cuidMock.spyReturn = cuid()
  t.context.cuidMock.spy = spy(() => t.context.cuidMock.spyReturn)
  mock('cuid', t.context.cuidMock.spy)

  t.context.focusOnElmOfVnodeMock = Symbol('./focus-on-elm-of-vnode')
  mock('./focus-on-elm-of-vnode', t.context.focusOnElmOfVnodeMock)

  t.context.playerMock = mockPathWithSpy('./player')
  t.context.barrierMock = mockPathWithSpy('./barrier')
  t.context.subject = requireUncached('./arena')
})

const arenaArgs = [
  Symbol('leftHiding'),
  Symbol('rightHiding')
]

test('vtree', t => {
  const expectedVtree = h('arena',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    },
    [
      t.context.playerMock.spyReturn,
      t.context.barrierMock.spyReturn,
      t.context.playerMock.spyReturn
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
