const { test } = require('ava')
const isEqual = require('lodash.isequal')
const h = require('./h')
const requireUncached = require('require-uncached')
const mockPathWithSimpleSpy = require('mock-path-with-simple-spy')

const playerImgMocks = mockPathWithSimpleSpy('./player-img')

test.beforeEach((t) => {
  t.context.playerImgMock = playerImgMocks.next().value
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
        playerImgMocks.spyReturn,
        playerImgMocks.spyReturn
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
    t.deepEqual(t.context.playerImgMock.args, expected)
  })
}

possibleCallArgs.forEach(testWithCallArgs)
