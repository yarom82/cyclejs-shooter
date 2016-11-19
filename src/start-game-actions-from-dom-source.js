const {
  actionNames: {startGame}
} = require('./constants')
const {
  selector: startGameButtonSelector
} = require('./vtree-from-state/start-game-button')

const startGameActionsFromDOMSource = DOMSource => {
  return DOMSource
    .select(startGameButtonSelector)
    .events('click')
    .mapTo({ name: startGame })
}

module.exports = startGameActionsFromDOMSource
