const {
  actionNames: {startGame}
} = require('./constants')
const {
  selector: startGameButtonSelector
} = require('./vtree-from-state/start-game-button')

const startGame$fromDOMSource = DOMSource => {
  return DOMSource
    .select(startGameButtonSelector)
    .events('click')
    .mapTo(startGame)
}

module.exports = startGame$fromDOMSource
