const { test } = require('ava')
const h = require('./h')
const mockPathWithSpyThatReturnsSymbolHere = require('../../utils/mock-path-with-spy-that-returns-symbol')(__dirname)

const {
  returnSymbol: playerImgReturnSymbol,
  spy: playerImgSpy
} = mockPathWithSpyThatReturnsSymbolHere('./player-img')

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
        playerImgReturnSymbol,
        playerImgReturnSymbol
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
