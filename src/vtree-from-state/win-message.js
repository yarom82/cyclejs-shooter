const { players } = require('../constants')
const { div } = require('@cycle/dom')

const winMessage = winner => {
  const winPlayer = winner === players.leftPlayer ? 'Left' : 'Right'
  return div(
    {
      style: {
        textAlign: 'center'
      }
    },
    `${winPlayer} won!`
  )
}

module.exports = winMessage
