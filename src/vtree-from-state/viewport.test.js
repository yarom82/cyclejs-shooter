const { test } = require('ava')
const mock = require('mock-require')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')
const h = require('./h')
const requireUncached = require('require-uncached')
const isEqual = require('lodash.isequal')
const { spy } = require('simple-spy')
const cuid = require('cuid')

const arenaMockReturn = Symbol('./arena')
const pauseMockReturn = Symbol('./pause')

test.beforeEach((t) => {
  t.context.cuidMock = {}
  t.context.cuidMock.spyReturn = cuid()
  t.context.cuidMock.spy = spy(() => t.context.cuidMock.spyReturn)
  mock('cuid', t.context.cuidMock.spy)

  t.context.focusOnElmOfVnodeMock = Symbol('./focus-on-elm-of-vnode')
  mock('./focus-on-elm-of-vnode', t.context.focusOnElmOfVnodeMock)

  t.context.arenaMock = mockPathWithSpy('./arena', arenaMockReturn)
  t.context.pauseMock = mockPathWithSpy('./pause', pauseMockReturn)
  t.context.subject = requireUncached('./viewport')
})

test('exports a function of arity 3', (t) => {
  t.is(typeof t.context.subject, 'function')
  t.is(t.context.subject.length, 3)
})

const expectedChildren = [
  {
    input: [null, null, false],
    children: [ arenaMockReturn ]
  },
  {
    input: [null, null, true],
    children: [ arenaMockReturn, pauseMockReturn ]
  }
]

expectedChildren.forEach(({input, children}) => {
  test(`vtree with paused=${input[2]}`, (t) => {
    const expected = h('viewport',
      {
        attrs: {
          'data-id': t.context.cuidMock.spyReturn,
          tabindex: 0
        },
        style: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        },
        hook: {
          insert: t.context.focusOnElmOfVnodeMock
        }
      },
      children
    )

    const actual = t.context.subject(...input)

    t.true(isEqual(actual, expected))
  })
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

const expectedPauseCallTimes = [
  {
    input: [null, null, false],
    times: 0
  },
  {
    input: [null, null, true],
    times: 1
  }
]

expectedPauseCallTimes.forEach(({input, times}) => {
  test(`\`pause\` is called ${times} times when paused=${input[2]}`, (t) => {
    t.context.subject(...input)
    t.is(t.context.pauseMock.spy.args.length, times)
  })
})

test('exports its unique selector', t => {
  t.is(t.context.subject.selector, `[data-id='${t.context.cuidMock.spyReturn}']`)
})
