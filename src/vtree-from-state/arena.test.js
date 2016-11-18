const { test } = require('ava')
const mock = require('mock-require')
const { div, span } = require('@cycle/dom')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)

const {
  returnSymbol: playerReturnSymbol,
  spy: playerSpy
} = mockPathWithSpyThatReturnsSymbolHere('./player')
test.afterEach(() => playerSpy.reset())

const focusOnElmFromVnodeStub = Symbol('focusOnElmFromVnodeStub')
mock('./focus-on-elm-from-vnode', focusOnElmFromVnodeStub)

const arena = require('./arena')

const divData = {
  class: {arena: true},
  attrs: {tabindex: 0},
  style: {
    position: 'relative',
    minHeight: '60px'
  },
  hook: {
    insert: focusOnElmFromVnodeStub
  }
}

test('vtree', t => {
  const expectedVtree = div(
    divData,
    [
      playerReturnSymbol,
      span(
        {
          style: {
            fontSize: '40px',
            position: 'absolute',
            bottom: '0'
          }
        },
        '|'
      ),
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
