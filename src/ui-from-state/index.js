const { div } = require('@cycle/dom')
const arena = require('./arena')
const winMessage = require('./win-message')
const instructions = require('./instructions')

const uiFromState = ({leftHiding, rightHiding, winner}) => {
  let firstChild
  if (winner) {
    firstChild = winMessage(winner)
  } else {
    firstChild = arena(leftHiding, rightHiding)
  }
  return div(
    {
      style: {textAlign: 'center'}
    },
    [
      firstChild,
      instructions(winner ? 'AFTER_WIN' : 'BEFORE_WIN')
    ]
  )
}

module.exports = uiFromState
