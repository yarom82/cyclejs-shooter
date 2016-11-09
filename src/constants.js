const constants = {
  gameStatus: {
    beforeGame: 'BEFORE_GAME',
    duringGame: 'DURING_GAME',
    afterGame: 'AFTER_GAME'
  },
  selectorPrefixes: {
    action: 'ACTION'
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

Object.freeze(constants)
module.exports = constants
