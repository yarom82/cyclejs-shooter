const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mock = require('mock-require')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const h = require('./h')
const requireUncached = require('require-uncached')
const { spy } = require('simple-spy')
const cuid = require('cuid')

const cuidStubReturn = cuid()
const cuidStub = () => cuidStubReturn
const cuidSpy = spy(cuidStub)
mock('cuid', cuidSpy)

const focusOnElmOfVnodeStub = Symbol('focusOnElmOfVnodeStub')
mock('./focus-on-elm-of-vnode', focusOnElmOfVnodeStub)

var data = {
  attrs: {
    'data-id': cuidStubReturn,
    tabindex: 0
  },
  style: {
    display: 'flex',
    flexDirection: 'column'
  },
  hook: {
    insert: focusOnElmOfVnodeStub
  }
}

;[
  cuidSpy
]
  .forEach(spy => {
    test.afterEach(() => {
      spy.reset()
    })
  })

test.beforeEach((t) => {
  t.context.arenaMock = mockPathWithSpyThatReturnsSymbolHere('./arena')
  t.context.subject = requireUncached('./viewport')
})

test('exports a function of arity 2', (t) => {
  t.is(typeof t.context.subject, 'function')
  t.is(t.context.subject.length, 2)
})

test('vtree', (t) => {
  const expected = h('viewport',
    data,
    [
      t.context.arenaMock.returnSymbol
    ]
  )

  const actual = t.context.subject()

  t.true(isEqual(actual, expected))
})

test('`arena` is called once', (t) => {
  t.context.subject()
  t.is(t.context.arenaMock.spy.args.length, 1)
})

test('`arena` call args', (t) => {
  const args = [Symbol('leftHiding'), Symbol('rightHiding')]
  t.context.subject(...args)
  t.true(isEqual(t.context.arenaMock.spy.args[0], args))
})

test('exports its unique selector', t => {
  t.is(t.context.subject.selector, `[data-id='${cuidStubReturn}']`)
})
