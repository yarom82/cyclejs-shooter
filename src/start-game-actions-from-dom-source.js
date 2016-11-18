const {
  actionNames: {startGame}
} = require('./constants')
const {
  selector: startGameButtonSelector
} = require('./ui-from-state/start-game-button')

const startGameActionsFromDOMSource = DOMSource => {
  return DOMSource
    .select(startGameButtonSelector)
    .events('click')
    .mapTo(startGame)
}

module.exports = startGameActionsFromDOMSource
