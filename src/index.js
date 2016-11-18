const rootDOMSourceFromDOMSource = require('./root-dom-source-from-dom-source')
const startGameActionsFromDOMSource = require('./start-game-actions-from-dom-source')
const arenaActionsFromDOMSource = require('./arena-actions-from-dom-source')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM: DOMSource}) => {
  const rootDOMSource = rootDOMSourceFromDOMSource(DOMSource)

  const startGameActions = startGameActionsFromDOMSource(rootDOMSource)
  const arenaActions = arenaActionsFromDOMSource(rootDOMSource)

  const actions = xs
    .merge(arenaActions, startGameActions)

  const states = actions
    .fold(stateMachine, initialState)

  const vtrees = states.map(vtreeFromState)
  return {DOM: vtrees}
}

module.exports = main
