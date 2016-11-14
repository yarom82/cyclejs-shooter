const initialState = require('./initial-state')
const { test } = require('ava')

const {
  gameStatus: {
    afoot
  }
} = require('./constants')

test('exported object deep equality assertion', t => {
  const expected = {
    gameStatus: afoot,
    leftHiding: true,
    rightHiding: true,
    winner: null
  }

  t.deepEqual(initialState, expected)
})
