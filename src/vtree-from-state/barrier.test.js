const { test } = require('ava')
const isEqual = require('lodash.isequal')
const h = require('./h')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  const barrierSvgMocks = mockPathWithSimpleSpy('./barrier-svg')
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
      t.context.barrierSvgMock.spyReturn
    ]
  )
  t.true(isEqual(t.context.subject(), expected))
})

test('`barrierSvg` descendant calls without args', t => {
  const expected = [
    []
  ]
  t.context.subject()
  t.true(isEqual(t.context.barrierSvgMock.spy.args, expected))
})
