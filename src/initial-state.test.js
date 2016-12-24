const initialState = require('./initial-state')
const isEqual = require('lodash.isequal')
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

  t.true(isEqual(initialState, expected))
})

test('exported object is frozen', t => {
  t.true(Object.isFrozen(initialState))
})
