const constants = require('./constants')
const { test } = require('ava')
const isRegalia = require('is-regalia')
const equalsRegalia = require('equals-regalia')

test('exports a regalia tree', t => {
  t.true(isRegalia(constants))
})

test('tree deep equality', t => {
  const definition = {
    gameStatus: [
      'idle',
      'afoot',
      'ended'
    ],
    actionNames: [
      'startGame',
      'hide',
      'unhide',
      'shoot'
    ],
    actionPayloadKeys: [
      'player'
    ],
    players: [
      'leftPlayer',
      'rightPlayer'
    ]
  }

  t.true(equalsRegalia(constants, definition))
})

test('exported object is frozen', t => {
  t.true(Object.isFrozen(constants))
})
