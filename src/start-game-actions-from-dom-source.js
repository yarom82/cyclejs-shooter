const {
  actionNames: {startGame}
} = require('./constants')
const {
  selector: startGameButtonSelector
} = require('./vtree-from-state/start-game-button')
const action = require('./action')
const startGameAction = action(startGame)

const startGameActionsFromDOMSource = DOMSource => {
  return DOMSource
    .select(startGameButtonSelector)
    .events('click')
    .mapTo(startGameAction)
}

module.exports = startGameActionsFromDOMSource
