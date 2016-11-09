const {
  selectorPrefixes: {action},
  actionNames: {startGame}
} = require('./constants')

const startGame$FromDOM = DOM => {
  return DOM
    .select(`.${action}:${startGame}`)
    .events('click')
    .mapTo(startGame)
}

module.exports = startGame$FromDOM
