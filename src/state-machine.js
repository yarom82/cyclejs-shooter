const {actionNames, players} = require('./constants')

const stateMachine = (currentState, action) => {
  const newState = Object.assign({}, currentState)
  switch (action) {
    case actionNames.leftHide:
      newState.leftHiding = true
      break
    case actionNames.leftUnhide:
      newState.leftHiding = false
      break
    case actionNames.rightHide:
      newState.rightHiding = true
      break
    case actionNames.rightUnhide:
      newState.rightHiding = false
      break
    case actionNames.leftShoot:
      if (noPlayersHiding(currentState.leftHiding, currentState.rightHiding)) {
        newState.leftHiding = newState.rightHiding = null
        newState.winner = players.leftPlayer
      }
      break
    case actionNames.rightShoot:
      if (noPlayersHiding(currentState.leftHiding, currentState.rightHiding)) {
        newState.leftHiding = newState.rightHiding = null
        newState.winner = players.rightPlayer
      }
      break
  }
  return newState
}

const noPlayersHiding = (leftHiding, rightHiding) => {
  return !leftHiding && !rightHiding
}

module.exports = stateMachine
