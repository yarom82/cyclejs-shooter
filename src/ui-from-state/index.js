const { div } = require('@cycle/dom')
const arena = require('./arena')
const winMessage = require('./win-message')
const instructions = require('./instructions')
const {
  gameStatus: {
    duringGame,
    afterGame
  }
} = require('../constants')

const uiFromState = ({gameStatus, leftHiding, rightHiding, winner}) => {
  let firstChild
  let instructionsArg
  switch (gameStatus) {
    case duringGame:
      firstChild = arena(leftHiding, rightHiding)
      instructionsArg = 'BEFORE_WIN'
      break
    case afterGame:
      firstChild = winMessage(winner)
      instructionsArg = 'AFTER_WIN'
      break
  }

  return div(
    {
      style: {textAlign: 'center'}
    },
    [
      firstChild,
      instructions(instructionsArg)
    ]
  )
}

module.exports = uiFromState
