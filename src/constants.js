const constants = {
  gameStatus: {
    idle: 'IDLE',
    afoot: 'AFOOT',
    ended: 'ENDED'
  },
  actionNames: {
    startGame: 'START_GAME',
    hide: 'HIDE',
    unhide: 'UNHIDE',
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

Object.freeze(constants)
module.exports = constants
