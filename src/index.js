const rootDOMSourceFromDOMSource = require('./root-dom-source-from-dom-source')
const startGame$FromDOMSource = require('./start-game-stream-from-dom-source')
const arenaAction$FromDOMSource = require('./arena-action-stream-from-dom-source')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM: DOMSource}) => {
  const rootDOMSource = rootDOMSourceFromDOMSource(DOMSource)

  const startGame$ = startGame$FromDOMSource(rootDOMSource)
  const arenaAction$ = arenaAction$FromDOMSource(rootDOMSource)

  const action$ = xs
    .merge(arenaAction$, startGame$)

  const state$ = action$
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(uiFromState)
  return {DOM: vtree$}
}

module.exports = main
