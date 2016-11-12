const { div } = require('@cycle/dom')
const startGameButton = require('./start-game-button')
const arena = require('./arena')
const winMessage = require('./win-message')
const instructions = require('./instructions')
const {
  gameStatus: {
    idle,
    afoot,
    ended
  }
} = require('../constants')

const uiFromState = ({gameStatus, leftHiding, rightHiding, winner}) => {
  let firstChild
  switch (gameStatus) {
    case idle:
      firstChild = startGameButton
      break
    case afoot:
      firstChild = arena(leftHiding, rightHiding)
      break
    case ended:
      firstChild = winMessage(winner)
      break
  }

  return div(
    {
      style: {textAlign: 'center'}
    },
    [
      firstChild,
      instructions(gameStatus === ended ? 'AFTER_WIN' : 'BEFORE_WIN')
    ]
  )
}

module.exports = uiFromState
