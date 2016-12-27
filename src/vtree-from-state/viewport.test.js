const { test } = require('ava')
const isEqual = require('lodash.isequal')
const mock = require('mock-require')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')
const h = require('./h')
const requireUncached = require('require-uncached')
const { spy } = require('simple-spy')
const cuid = require('cuid')

const cuidStubReturn = cuid()
const cuidStub = () => cuidStubReturn
const cuidSpy = spy(cuidStub)
mock('cuid', cuidSpy)

test.beforeEach((t) => {
  t.context.cuidMock = {}
  t.context.cuidMock.spyReturn = cuid()
  t.context.cuidMock.spy = spy(() => t.context.cuidMock.spyReturn)
  mock('cuid', t.context.cuidMock.spy)

  t.context.focusOnElmOfVnodeMock = Symbol('./focus-on-elm-of-vnode')
  mock('./focus-on-elm-of-vnode', t.context.focusOnElmOfVnodeMock)

  t.context.arenaMock = mockPathWithSpy('./arena')
  t.context.subject = requireUncached('./viewport')
})

test('exports a function of arity 2', (t) => {
  t.is(typeof t.context.subject, 'function')
  t.is(t.context.subject.length, 2)
})

test('vtree', (t) => {
  const expected = h('viewport',
    {
      attrs: {
        'data-id': t.context.cuidMock.spyReturn,
        tabindex: 0
      },
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      hook: {
        insert: t.context.focusOnElmOfVnodeMock
      }
    },
    [
      t.context.arenaMock.spyReturn
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
  t.is(t.context.subject.selector, `[data-id='${t.context.cuidMock.spyReturn}']`)
})
