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

Object.freeze(initialState)

module.exports = initialState
