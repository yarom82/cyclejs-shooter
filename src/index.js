const rootDOM$FromDOM = require('./root-dom-stream-from-dom')
const startGame$FromDOM = require('./start-game-stream-from-dom')
const arenaAction$FromDOM = require('./arena-action-stream-from-dom')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM}) => {
  const rootDOM$ = rootDOM$FromDOM(DOM)

  const startGame$ = startGame$FromDOM(rootDOM$)
  const arenaAction$ = arenaAction$FromDOM(rootDOM$)

  const action$ = xs
    .merge(arenaAction$, startGame$)

  const state$ = action$
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(uiFromState)
  return {DOM: vtree$}
}

module.exports = main
