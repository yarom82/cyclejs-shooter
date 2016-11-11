const constants = require('./constants')
const { test } = require('ava')

test('exported object deep equality assertion', t => {
  const expectedConstants = {
    selectorPrefixes: {
      action: 'ACTION'
    },
    actionNames: {
      start: 'START',
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
