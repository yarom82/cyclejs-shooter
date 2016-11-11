const initialState = require('./initial-state')
const { test } = require('ava')

test('exported object deep equality assertion', t => {
  const expected = {
    started: false,
    leftHiding: true,
    rightHiding: true,
    winner: null
  }

  t.deepEqual(initialState, expected)
})
