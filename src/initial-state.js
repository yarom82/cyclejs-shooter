const {
  gameStatus: {
    duringGame
  }
} = require('./constants')

const initialState = {
  gameStatus: duringGame,
  leftHiding: true,
  rightHiding: true,
  winner: null
}

module.exports = initialState
