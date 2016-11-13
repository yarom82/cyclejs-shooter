const {
  actionNames: {startGame}
} = require('./constants')
const { className } = require('./ui-from-state/start-game-button')

const startGame$FromDOM = DOM => {
  return DOM
    .select(`.${className}`)
    .events('click')
    .mapTo(startGame)
}

module.exports = startGame$FromDOM
