const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mock = require('mock-require')
const h = require('./h')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const { spy } = require('simple-spy')
const cuid = require('cuid')

const cuidStubReturn = cuid()
const cuidStub = () => cuidStubReturn
const cuidSpy = spy(cuidStub)
mock('cuid', cuidSpy)

const {
  returnSymbol: playerReturnSymbol,
  spy: playerSpy
} = mockPathWithSpyThatReturnsSymbolHere('./player')

const {
  returnSymbol: barrierReturnSymbol,
  spy: barrierSpy
} = mockPathWithSpyThatReturnsSymbolHere('./barrier')

;[
  cuidSpy,
  playerSpy,
  barrierSpy
]
  .forEach(spy => {
    test.afterEach(() => {
      spy.reset()
    })
  })

const focusOnElmOfVnodeStub = Symbol('focusOnElmOfVnodeStub')
mock('./focus-on-elm-of-vnode', focusOnElmOfVnodeStub)

const arena = require('./arena')

const arenaArgs = [
  Symbol('leftHiding'),
  Symbol('rightHiding')
]

const data = {
  attrs: {
    'data-id': cuidStubReturn,
    tabindex: 0
  },
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '60px'
  },
  hook: {
    insert: focusOnElmOfVnodeStub
  }
}

test('vtree', t => {
  const expectedVtree = h('arena',
    data,
    [
      playerReturnSymbol,
      barrierReturnSymbol,
      playerReturnSymbol
    ]
  )

  const actualVtree = arena()
  t.true(isEqual(actualVtree, expectedVtree))
})

test('`player` descendants calls args', t => {
  const expectedPlayerCallsArgs = [
    ['left', arenaArgs[0]],
    ['right', arenaArgs[1]]
  ]
  arena(...arenaArgs)
  t.true(isEqual(playerSpy.args, expectedPlayerCallsArgs))
})

test('`barrier` descendant calls without args', t => {
  const expected = [
    []
  ]
  arena(...arenaArgs)
  t.true(isEqual(barrierSpy.args, expected))
})

test('exports its unique selector', t => {
  t.is(arena.selector, `[data-id='${cuidStubReturn}']`)
})
