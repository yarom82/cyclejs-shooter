const constants = require('./constants')
const { test } = require('ava')

test('exported object deep equality assertion', t => {
  const expectedConstants = {
    gameStatus: {
      duringGame: 'DURING_GAME',
      afterGame: 'AFTER_GAME'
    },
    actionNames: {
      startGame: 'START_GAME',
      leftHide: 'LEFT_HIDE',
      rightHide: 'RIGHT_HIDE',
      leftUnhide: 'LEFT_UNHIDE',
      rightUnhide: 'RIGHT_UNHIDE',
      leftShoot: 'LEFT_SHOOT',
      rightShoot: 'RIGHT_SHOOT'
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
