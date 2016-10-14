// todo: immutablejs

const stateMachine = (currentState, action) => {
  const newState = Object.assign({}, currentState)
  switch (action) {
    case 'LEFT_DOWN':
      newState.leftPlayerDown = true
      break
    case 'LEFT_UP':
      newState.leftPlayerDown = false
      break
    case 'RIGHT_DOWN':
      newState.rightPlayerDown = true
      break
    case 'RIGHT_UP':
      newState.rightPlayerDown = false
      break
  }
  return newState
}

module.exports = stateMachine
