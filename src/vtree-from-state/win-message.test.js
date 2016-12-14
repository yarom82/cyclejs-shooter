const { test } = require('ava')
const winMessage = require('./win-message')
const { div } = require('@cycle/dom')

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
  const expected = div(
    {
      style: {
        textAlign: 'center'
      }
    },
    `${winner} won!`
  )
  test(`given '${arg}' returns '${expected}'`, t => {
    const actual = winMessage(arg)
    t.deepEqual(actual, expected)
  })
}

possibleArgs.forEach(withPossibleArg)
