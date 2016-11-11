const { div } = require('@cycle/dom')
const arena = require('./arena')
const winMessage = require('./win-message')
const instructions = require('./instructions')
const {
  gameStatus: {
    afoot,
    ended
  }
} = require('../constants')

const uiFromState = ({gameStatus, leftHiding, rightHiding, winner}) => {
  let firstChild
  let instructionsArg
  switch (gameStatus) {
    case afoot:
      firstChild = arena(leftHiding, rightHiding)
      instructionsArg = 'BEFORE_WIN'
      break
    case ended:
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
