const { test } = require('ava')
const h = require('./h')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')
const requireUncached = require('require-uncached')

const barrierSvgMocks = mockPathWithSimpleSpy('./barrier-svg')

test.beforeEach((t) => {
  t.context.barrierSvgMock = barrierSvgMocks.next().value
  t.context.subject = requireUncached('./barrier')
})

test('vtree', t => {
  const expected = h('barrier',
    {
      style: {
        flexBasis: '1%',
        display: 'flex',
        alignItems: 'flex-end'
      }
    },
    [
      barrierSvgMocks.spyReturn
    ]
  )
  t.deepEqual(t.context.subject(), expected)
})

test('`barrierSvg` descendant calls without args', t => {
  const expected = [
    []
  ]
  t.context.subject()
  t.deepEqual(t.context.barrierSvgMock.args, expected)
})
