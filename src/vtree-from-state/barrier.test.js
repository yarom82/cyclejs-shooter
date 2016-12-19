const { test } = require('ava')
const h = require('./h')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)

const {
  returnSymbol: barrierSvgReturnSymbol,
  spy: barrierSvgSpy
} = mockPathWithSpyThatReturnsSymbolHere('./barrier-svg')

test.beforeEach(() => {
  barrierSvgSpy.reset()
})

const barrier = require('./barrier')

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
      barrierSvgReturnSymbol
    ]
  )
  t.deepEqual(barrier(), expected)
})

test('`barrierSvg` descendant calls without args', t => {
  const expected = [
    []
  ]
  barrier()
  t.deepEqual(barrierSvgSpy.args, expected)
})
