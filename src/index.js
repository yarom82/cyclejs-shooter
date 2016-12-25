const rootDOMSourceFromDOMSource = require('./root-dom-source-from-dom-source')
const startGameActionsFromDOMSource = require('./start-game-actions-from-dom-source')
const viewportActionsFromDOMSource = require('./viewport-actions-from-dom-source')
const vtreeFromState = require('./vtree-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM: DOMSource}) => {
  const rootDOMSource = rootDOMSourceFromDOMSource(DOMSource)

  const startGameActions = startGameActionsFromDOMSource(rootDOMSource)
  const viewportActions = viewportActionsFromDOMSource(rootDOMSource)

  const actions = xs
    .merge(viewportActions, startGameActions)

  const states = actions
    .fold(stateMachine, initialState)

  const vtrees = states.map(vtreeFromState)
  return {DOM: vtrees}
}

module.exports = main
