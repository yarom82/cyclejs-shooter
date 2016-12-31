const regalia = require('regalia')

const constants = regalia({
  gameStatus: [
    'idle',
    'afoot',
    'ended',
    'paused'
  ],
  actionNames: [
    'startGame',
    'hide',
    'unhide',
    'shoot',
    'pause'
  ],
  actionPayloadKeys: [
    'player'
  ],
  players: [
    'leftPlayer',
    'rightPlayer'
  ]
})

Object.freeze(constants)
module.exports = constants
