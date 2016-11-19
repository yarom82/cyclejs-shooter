const { test } = require('ava')
const mock = require('mock-require')
const { div, span } = require('@cycle/dom')
const { spy } = require('simple-spy')
const cuid = require('cuid')

const cuidStubReturn = cuid()
const cuidStub = () => cuidStubReturn
const cuidSpy = spy(cuidStub)
mock('cuid', cuidSpy)

const playerStubReturn = Symbol('playerStub')
const playerStub = (side, hiding) => playerStubReturn
const playerSpy = spy(playerStub)
mock('./player', playerSpy)

;[
  cuidSpy,
  playerSpy
]
  .forEach(spy => {
    test.afterEach(() => {
      spy.reset()
    })
  })

const focusOnElmFromVnodeStub = Symbol('focusOnElmFromVnodeStub')
mock('./focus-on-elm-from-vnode', focusOnElmFromVnodeStub)

const arena = require('./arena')

const divData = {
  attrs: {
    'data-id': cuidStubReturn,
    tabindex: 0
  },
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

test('exports its unique selector', t => {
  t.is(arena.selector, `[data-id='${cuidStubReturn}']`)
})
