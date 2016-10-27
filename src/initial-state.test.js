const initialState = require('./initial-state')
const { test } = require('ava')

test('Exported object deep equality check', t => {
  const expected = {
    leftHiding: true,
    rightHiding: true,
    winner: null
  }

  t.deepEqual(initialState, expected)
})
