const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
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
// test.afterEach(() => playerSpy.reset())

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

const divData = {
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
  const expectedVtree = div(
    divData,
    [
      playerReturnSymbol,
      barrierReturnSymbol,
      playerReturnSymbol
    ]
  )

  const actualVtree = arena()
  t.deepEqual(actualVtree, expectedVtree)
})

test('`player` descendants calls args', t => {
  const args = [
    Symbol('leftHiding'),
    Symbol('rightHiding')
  ]
  const expectedPlayerCallsArgs = [
    ['left', args[0]],
    ['right', args[1]]
  ]
  arena(...args)
  t.deepEqual(playerSpy.args, expectedPlayerCallsArgs)
})

test('exports its unique selector', t => {
  t.is(arena.selector, `[data-id='${cuidStubReturn}']`)
})
