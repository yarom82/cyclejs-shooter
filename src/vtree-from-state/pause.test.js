const { test } = require('ava')
const isEqual = require('lodash.isequal')
const h = require('./h')
const requireUncached = require('require-uncached')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')

test.beforeEach((t) => {
  const pauseImgMocks = mockPathWithSimpleSpy('./pause-img')
  t.context.pauseImgMock = pauseImgMocks.next().value
  t.context.subject = requireUncached('./pause')
})

test('vtree', t => {
  const expected = h('pause-overlay',
    {
      style: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(150, 150, 150, 0.8)'
      }
    },
    [
      h('pause',
        {
          style: {
            display: 'flex',
            alignItems: 'flex-end',
            flexBasis: '14%'
          }
        },
        [
          t.context.pauseImgMock.spyReturn
        ]
      )
    ]
  )
  t.true(isEqual(t.context.subject(), expected))
})

test('descendant `pauseImg` calls no args', t => {
  const expected = [
    []
  ]
  t.context.subject()
  t.deepEqual(t.context.pauseImgMock.spy.args, expected)
})
