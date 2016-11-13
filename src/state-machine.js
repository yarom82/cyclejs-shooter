const {
  actionNames,
  gameStatus: {
    idle,
    afoot
  },
  players
} = require('./constants')

const impossibleActionMessage = 'Impossible action at current state'

const stateMachine = (currentState, action) => {
  const newState = Object.assign({}, currentState)
  switch (action) {
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
    case actionNames.leftShoot:
      Object.assign(newState, shoot(players.leftPlayer, currentState))
      break
    case actionNames.rightShoot:
      Object.assign(newState, shoot(players.rightPlayer, currentState))
      break
  }
  return newState
}

const shoot = (player, currentState) => {
  if (currentState.gameStatus !== 'AFOOT') {
    throw new Error(impossibleActionMessage)
  }
  if (noPlayersHiding(currentState.leftHiding, currentState.rightHiding)) {
    return { leftHiding: null, rightHiding: null, gameStatus: 'ENDED', winner: player }
  }
}

const noPlayersHiding = (leftHiding, rightHiding) => {
  return !leftHiding && !rightHiding
}

module.exports = stateMachine
