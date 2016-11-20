const {
  actionNames,
  gameStatus: {
    idle,
    afoot,
    ended
  },
  actionPayloadKeys: {
    player
  }
} = require('./constants')

const actionNameKey = require('./action').nameKey

const impossibleActionMessage = 'Impossible action at current state'

const stateMachine = (currentState, action) => {
  const name = action[actionNameKey]
  const newState = Object.assign({}, currentState)
  switch (name) {
    case actionNames.startGame:
      if (currentState.gameStatus !== idle) {
        throw new Error(impossibleActionMessage)
      }
      newState.gameStatus = afoot
      break
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
    case actionNames.shoot:
      if (currentState.gameStatus !== afoot) {
        throw new Error(impossibleActionMessage)
      }
      if (noPlayersHiding(currentState.leftHiding, currentState.rightHiding)) {
        Object.assign(
          newState,
          {
            leftHiding: null,
            rightHiding: null,
            gameStatus: ended,
            winner: action[player]
          }
        )
      }
      break
  }
  return newState
}

const noPlayersHiding = (leftHiding, rightHiding) => {
  return !leftHiding && !rightHiding
}

module.exports = stateMachine
