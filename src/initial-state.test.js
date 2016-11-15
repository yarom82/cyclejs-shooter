const initialState = require('./initial-state')
const { test } = require('ava')

const {
  gameStatus: {
    idle
  }
} = require('./constants')

test('exported object deep equality assertion', t => {
  const expected = {
    gameStatus: idle,
    leftHiding: true,
    rightHiding: true,
    winner: null
  }

  t.deepEqual(initialState, expected)
})
