const { div } = require('@cycle/dom')
const arena = require('./arena')
const winMessage = require('./win-message')

const uiFromState = ({leftHiding, rightHiding, winner}) => {
  let child
  if (winner) {
    child = winMessage(winner)
  } else {
    child = arena(leftHiding, rightHiding)
  }
  return div(
    {
      style: {textAlign: 'center'}
    },
    [ child ]
  )
}

module.exports = uiFromState
