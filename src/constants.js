const constants = {
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
