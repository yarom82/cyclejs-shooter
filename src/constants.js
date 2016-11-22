const constants = {
  gameStatus: {
    idle: Symbol.for('gameStatus.idle'),
    afoot: Symbol.for('gameStatus.afoot'),
    ended: Symbol.for('gameStatus.ended')
  },
  actionNames: {
    startGame: Symbol.for('actionNames.startGame'),
    hide: Symbol.for('actionNames.hide'),
    unhide: Symbol.for('actionNames.unhide'),
    shoot: Symbol.for('actionNames.shoot')
  },
  actionPayloadKeys: {
    player: Symbol.for('actionPayloadKeys.player')
  },
  players: {
    leftPlayer: Symbol.for('players.leftPlayer'),
    rightPlayer: Symbol.for('players.rightPlayer')
  }
}

Object.freeze(constants)
module.exports = constants
