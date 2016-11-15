const rootDOMSourceFromDOMSource = require('./root-dom-source-from-dom-source')
const startGame$FromDOM = require('./start-game-stream-from-dom')
const arenaAction$FromDOM = require('./arena-action-stream-from-dom')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM: DOMSource}) => {
  const rootDOMSource = rootDOMSourceFromDOMSource(DOMSource)

  const startGame$ = startGame$FromDOM(rootDOMSource)
  const arenaAction$ = arenaAction$FromDOM(rootDOMSource)

  const action$ = xs
    .merge(arenaAction$, startGame$)

  const state$ = action$
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(uiFromState)
  return {DOM: vtree$}
}

module.exports = main
