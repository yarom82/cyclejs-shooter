const { test } = require('ava')
const winMessage = require('./win-message')

const possibleArgs = [
  'LEFT_PLAYER',
  'RIGHT_PLAYER'
]

const withPossibleArg = arg => {
  const winner = arg === 'LEFT_PLAYER' ? 'Left' : 'Right'
  const expected = `${winner} won!`
  test(`given '${arg}' returns '${expected}'`, t => {
    const actual = winMessage(arg)
    t.is(actual, expected)
  })
}

possibleArgs.forEach(withPossibleArg)
