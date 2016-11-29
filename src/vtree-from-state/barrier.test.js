const { test } = require('ava')
const { div } = require('@cycle/dom')
const barrier = require('./barrier')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)

const {
  returnSymbol: barrireSvgReturnSymbol,
  spy: barrierSvgSpy
} = mockPathWithSpyThatReturnsSymbolHere('./barrier-svg')

test.beforeEach(() => {
  barrierSvgSpy.reset()
})

test('vtree', t => {
  const expected = div(
    {
      style: {
        flexBasis: '1%',
        display: 'flex',
        alignItems: 'flex-end'
      }
    },
    [
      barrireSvgReturnSymbol
    ]
  )
  t.deepEqual(barrier(), expected)
})

test('`barrierSvg` descendant calls without args', t => {
  const expected = []
  barrier()
  t.deepEqual(barrierSvgSpy.args, expected)
})
