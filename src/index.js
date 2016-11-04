const start$FromDOM = require('./start-stream-from-dom')
const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')
const {actionNames} = require('./constants')
const arenaDOM$FromDOM = require('./arena-dom-stream-from-dom')
const keyFromEvent = require('./key-from-event')

const main = ({DOM}) => {
  const arenaDOM$ = arenaDOM$FromDOM(DOM)

  const start$ = start$FromDOM(DOM)

  const keypress$ = arenaDOM$
    .events('keypress')
    .map(keyFromEvent)
  const leftShoot$ = keypress$
    .filter(key => key === 'z')
    .mapTo(actionNames.leftShoot)
  const rightShoot$ = keypress$
    .filter(key => key === '/')
    .mapTo(actionNames.rightShoot)

  const keydown$ = arenaDOM$
    .events('keydown')
    .map(keyFromEvent)
  const leftHide$ = keydown$
    .filter(key => key === 'a')
    .mapTo(actionNames.leftHide)
  const rightHide$ = keydown$
    .filter(key => key === '\'')
    .mapTo(actionNames.rightHide)

  const keyup$ = arenaDOM$
    .events('keyup')
    .map(keyFromEvent)
  const leftUnhide$ = keyup$
    .filter(key => key === 'a')
    .mapTo(actionNames.leftUnhide)
  const rightUnhide$ = keyup$
    .filter(key => key === '\'')
    .mapTo(actionNames.rightUnhide)

  const action$ = xs
    .merge(start$, leftShoot$, rightShoot$, leftHide$, rightHide$, leftUnhide$, rightUnhide$)

  const state$ = action$
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(uiFromState)
  return {DOM: vtree$}
}

module.exports = main
