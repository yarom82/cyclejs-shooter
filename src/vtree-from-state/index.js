const h = require('./h')
const startGameButton = require('./start-game-button')
const viewport = require('./viewport')
const winMessage = require('./win-message')
const instructions = require('./instructions')
const {
  gameStatus: {
    idle,
    afoot,
    ended,
    paused
  }
} = require('../constants')

const vtreeFromState = ({gameStatus, leftHiding, rightHiding, winner}) => {
  let firstChild
  switch (gameStatus) {
    case idle:
      firstChild = startGameButton()
      break
    case afoot:
    case paused:
      firstChild = viewport(leftHiding, rightHiding, gameStatus === paused)
      break
    case ended:
      firstChild = winMessage(winner)
      break
  }

  return h('index',
    {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    },
    [
      firstChild,
      instructions(gameStatus === ended ? 'AFTER_WIN' : 'BEFORE_WIN')
    ]
  )
}

module.exports = vtreeFromState
