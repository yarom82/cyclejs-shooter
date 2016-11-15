const {
  actionNames: {startGame}
} = require('./constants')
const {
  selector: startGameButtonSelector
} = require('./ui-from-state/start-game-button')

const startGameActionsFromDOM = DOM => {
  return DOM
    .select(startGameButtonSelector)
    .events('click')
    .mapTo(startGame)
}

module.exports = startGameActionsFromDOM
