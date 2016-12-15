const { test } = require('ava')
const winMessage = require('./win-message')

const {
  players: {
    leftPlayer,
    rightPlayer
  }
} = require('../constants')

const possibleArgs = [
  leftPlayer,
  rightPlayer
]

const withPossibleArg = arg => {
  const winner = arg === leftPlayer ? 'Left' : 'Right'
  const expected = `${winner} won!`
  test(`given \`${String(arg)}\` returns '${expected}'`, t => {
    const actual = winMessage(arg)
    t.is(actual, expected)
  })
}

possibleArgs.forEach(withPossibleArg)
