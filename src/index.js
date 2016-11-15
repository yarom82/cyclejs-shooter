const rootDOMsFromDOM = require('./root-doms-from-dom')
const startGameActionsFromDOM = require('./start-game-actions-from-dom')
const arenaActionsFromDOM = require('./arena-actions-from-dom')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM}) => {
  const rootDOMs = rootDOMsFromDOM(DOM)

  const startGameActions = startGameActionsFromDOM(rootDOMs)
  const arenaActions = arenaActionsFromDOM(rootDOMs)

  const actions = xs
    .merge(arenaActions, startGameActions)

  const states = actions
    .fold(stateMachine, initialState)

  const vtrees = states.map(uiFromState)
  return {DOM: vtrees}
}

module.exports = main
