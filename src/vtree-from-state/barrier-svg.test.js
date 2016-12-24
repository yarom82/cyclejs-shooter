const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { svg, h } = require('@cycle/dom')
const barrierSvg = require('./barrier-svg')

test('vtree', t => {
  const expected = svg(
    {
      attrs: {
        viewBox: '0 0 1 9',
        width: '100%'
      }
    },
    [
      h('rect',
        {
          attrs: {
            width: '100%',
            height: '100%'
          }
        }
      )
    ]
  )
  t.true(isEqual(barrierSvg(), expected))
})
