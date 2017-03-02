const { test } = require('ava')
const mock = require('mock-require')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')
const h = require('./h')
const requireUncached = require('require-uncached')
const { spy } = require('simple-spy')
const cuid = require('cuid')

const arenaMocks = mockPathWithSimpleSpy('./arena')
const pauseMocks = mockPathWithSimpleSpy('./pause')

test.beforeEach((t) => {
  t.context.cuidMock = {}
  t.context.cuidMock.spyReturn = cuid()
  t.context.cuidMock.spy = spy(() => t.context.cuidMock.spyReturn)
  mock('cuid', t.context.cuidMock.spy)

  t.context.focusOnElmOfVnodeMock = Symbol('./focus-on-elm-of-vnode')
  mock('./focus-on-elm-of-vnode', t.context.focusOnElmOfVnodeMock)

  t.context.arenaMock = arenaMocks.next().value
  t.context.pauseMock = pauseMocks.next().value

  t.context.subject = requireUncached('./viewport')
})

test('exports a function of arity 3', (t) => {
  t.is(typeof t.context.subject, 'function')
  t.is(t.context.subject.length, 3)
})

const expectedChildren = [
  {
    input: [null, null, false],
    children: [ arenaMocks.spyReturn, undefined ]
  },
  {
    input: [null, null, true],
    children: [ arenaMocks.spyReturn, pauseMocks.spyReturn ]
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

    t.deepEqual(actual, expected)
  })
})

test('`arena` is called once', (t) => {
  t.context.subject()
  t.is(t.context.arenaMock.args.length, 1)
})

test('`arena` call args', (t) => {
  const args = [Symbol('leftHiding'), Symbol('rightHiding')]
  t.context.subject(...args)
  t.deepEqual(t.context.arenaMock.args[0], args)
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
    t.is(t.context.pauseMock.args.length, times)
  })
})

test('exports its unique selector', t => {
  t.is(t.context.subject.selector, `[data-id='${t.context.cuidMock.spyReturn}']`)
})
