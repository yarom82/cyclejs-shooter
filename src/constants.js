const regalia = require('regalia')

const constants = regalia({
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
})

Object.freeze(constants)
module.exports = constants
