const rootDOM$FromDOM = require('./root-dom-stream-from-dom')
const arenaAction$FromDOM = require('./arena-action-stream-from-dom')
const start$FromDOM = require('./start-stream-from-dom')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const main = ({DOM}) => {
  const rootDOM$ = rootDOM$FromDOM(DOM)

  const arenaAction$ = arenaAction$FromDOM(rootDOM$)
  const start$ = start$FromDOM(rootDOM$)

  const action$ = xs
    .merge(arenaAction$, start$)

  const state$ = action$
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(uiFromState)
  return {DOM: vtree$}
}

module.exports = main
