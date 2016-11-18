const { test } = require('ava')
const { div } = require('@cycle/dom')
const { spy } = require('simple-spy')
const mock = require('mock-require')

const playerImgStubReturn = Symbol('playerImgStubReturn')
const playerImgStub = (hiding, displayNone) => playerImgStubReturn
const playerImgSpy = spy(playerImgStub)
mock('./player-img', playerImgSpy)

test.beforeEach(() => {
  playerImgSpy.reset()
})

const player = require('./player')

const possibleCallArgs = [
  ['left', false],
  ['left', true],
  ['right', false],
  ['right', true]
]

const testWithCallArgs = ([side, hiding]) => {
  const testCondition = `when side: ${side}, hiding: ${hiding}`

  test(`vtree ${testCondition}`, t => {
    const expected = div(
      {
        style: {
          position: 'absolute',
          bottom: '0',
          [side]: '0',
          transform: side === 'right' ? 'scale(-1,1)' : null
        }
      },
      [
        playerImgStubReturn,
        playerImgStubReturn
      ]
    )
    t.deepEqual(player(side, hiding), expected)
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
    player(side, hiding)
    t.deepEqual(playerImgSpy.args, expected)
  })
}

possibleCallArgs.forEach(testWithCallArgs)
