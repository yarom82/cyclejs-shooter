const { test } = require('ava')
const mock = require('mock-require')
const { div, span } = require('@cycle/dom')
const { spy } = require('simple-spy')

const playerStubReturn = Symbol('playerStub')
const playerStub = (side, hiding) => playerStubReturn
const playerSpy = spy(playerStub)
test.afterEach(() => playerSpy.reset())
mock('./player', playerSpy)

const arena = require('./arena')

const divData = {
  class: {arena: true},
  attrs: {tabindex: 0},
  style: {
    position: 'relative',
    minHeight: '60px'
  }
}

test('vtree', t => {
  const expectedVtree = div(
    divData,
    [
      playerStubReturn,
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
      playerStubReturn
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