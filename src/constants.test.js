const constants = require('./constants')
const { test } = require('ava')

test('exported object deep equality assertion', t => {
  const expectedConstants = {
    gameStatus: {
      idle: 'IDLE',
      afoot: 'AFOOT',
      ended: 'ENDED'
    },
    actionNames: {
      startGame: 'START_GAME',
      leftHide: 'LEFT_HIDE',
      rightHide: 'RIGHT_HIDE',
      leftUnhide: 'LEFT_UNHIDE',
      rightUnhide: 'RIGHT_UNHIDE',
      shoot: 'SHOOT'
    },
    actionPayloadKeys: {
      player: 'PLAYER'
    },
    players: {
      leftPlayer: 'LEFT_PLAYER',
      rightPlayer: 'RIGHT_PLAYER'
    }
  }

  t.deepEqual(constants, expectedConstants)
})

test('exported object is frozen', t => {
  t.true(Object.isFrozen(constants))
})
