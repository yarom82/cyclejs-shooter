const { players } = require('../constants')

const winMessage = winner => {
  const winPlayer = winner === players.leftPlayer ? 'Left' : 'Right'
  const message = `${winPlayer} won!`
  return message
}

module.exports = winMessage
