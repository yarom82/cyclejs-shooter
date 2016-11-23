const {
  actionNames: {
    startGame,
    hide,
    unhide,
    shoot
  },
  gameStatus: {
    idle,
    afoot,
    ended
  },
  actionPayloadKeys: {
    player
  },
  players: {
    leftPlayer,
    rightPlayer
  }
} = require('./constants')

const actionNameKey = require('./action').nameKey

const impossibleActionMessage = 'Impossible action at current state'

const stateMachine = (currentState, action) => {
  const name = action[actionNameKey]
  const newState = Object.assign({}, currentState)
  const {
    gameStatus,
    leftHiding,
    rightHiding
  } = currentState
  switch (name) {
    case startGame:
      if (gameStatus !== idle) {
        throw new Error(impossibleActionMessage)
      }
      newState.gameStatus = afoot
      break
    case hide:
      switch (action[player]) {
        case leftPlayer:
          newState.leftHiding = true
          break
        case rightPlayer:
          newState.rightHiding = true
          break
      }
      break
    case unhide:
      switch (action[player]) {
        case leftPlayer:
          newState.leftHiding = false
          break
        case rightPlayer:
          newState.rightHiding = false
          break
      }
      break
    case shoot:
      if (gameStatus !== afoot) {
        throw new Error(impossibleActionMessage)
      }
      if (!leftHiding && !rightHiding) {
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

module.exports = stateMachine
