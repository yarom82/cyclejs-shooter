const { test } = require('ava')
const isEqual = require('lodash.isequal')
const h = require('./h')
const requireUncached = require('require-uncached')
const mockPathWithSpy = require('mock-path-with-spy-that-returns-x')

test.beforeEach((t) => {
  t.context.playerImgMock = mockPathWithSpy('./player-img')
  t.context.subject = requireUncached('./player')
})

const possibleCallArgs = [
  ['left', false],
  ['left', true],
  ['right', false],
  ['right', true]
]

const testWithCallArgs = ([side, hiding]) => {
  const testCondition = `when side: ${side}, hiding: ${hiding}`

  test(`vtree ${testCondition}`, t => {
    const expected = h('player',
      {
        style: {
          flexBasis: '15%',
          display: 'flex',
          alignItems: 'flex-end',
          transform: side === 'right' ? 'scale(-1,1)' : null
        }
      },
      [
        t.context.playerImgMock.spyReturn,
        t.context.playerImgMock.spyReturn
      ]
    )
    t.true(isEqual(t.context.subject(side, hiding), expected))
  })

  test(`descendant \`playerImg\` calls args ${testCondition}`, t => {
    const expected = [
      [
        false,
        hiding
      ],
      [
        true,
        !hiding
      ]
    ]
    t.context.subject(side, hiding)
    t.deepEqual(t.context.playerImgMock.spy.args, expected)
  })
}

possibleCallArgs.forEach(testWithCallArgs)
