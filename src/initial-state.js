const {
  gameStatus: {
    afoot
  }
} = require('./constants')

const initialState = {
  gameStatus: afoot,
  leftHiding: true,
  rightHiding: true,
  winner: null
}

module.exports = initialState
