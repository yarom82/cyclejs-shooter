const { test } = require('ava')
const h = require('./h')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)
const requireUncached = require('require-uncached')

test.beforeEach((t) => {
  t.context.barrierSvgMock = mockPathWithSpyThatReturnsSymbolHere('./barrier-svg')
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
      t.context.barrierSvgMock.returnSymbol
    ]
  )
  t.deepEqual(t.context.subject(), expected)
})

test('`barrierSvg` descendant calls without args', t => {
  const expected = [
    []
  ]
  t.context.subject()
  t.deepEqual(t.context.barrierSvgMock.spy.args, expected)
})
