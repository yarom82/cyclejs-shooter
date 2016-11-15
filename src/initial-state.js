const {
  gameStatus: {
    idle
  }
} = require('./constants')

const initialState = {
  gameStatus: idle,
  leftHiding: true,
  rightHiding: true,
  winner: null
}

module.exports = initialState
