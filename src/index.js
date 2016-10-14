const uiFromState = require('./ui-from-state')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')
const {actionNames} = require('./constants')

const getKeyFromEvent = e => e.key

const main = ({DOM}) => {
  const keypress$ = DOM
    .select('document')
    .events('keypress')
    .map(getKeyFromEvent)
  const leftShoot$ = keypress$
    .filter(key => key === 'z')
    .mapTo(actionNames.leftShoot)
  const rightShoot$ = keypress$
    .filter(key => key === '/')
    .mapTo(actionNames.rightShoot)

  const keydown$ = DOM
    .select('document')
    .events('keydown')
    .map(getKeyFromEvent)
  const leftHide$ = keydown$
    .filter(key => key === 'a')
    .mapTo(actionNames.leftHide)
  const rightHide$ = keydown$
    .filter(key => key === '\'')
    .mapTo(actionNames.rightHide)

  const keyup$ = DOM
    .select('document')
    .events('keyup')
    .map(getKeyFromEvent)
  const leftUnhide$ = keyup$
    .filter(key => key === 'a')
    .mapTo(actionNames.leftUnhide)
  const rightUnhide$ = keyup$
    .filter(key => key === '\'')
    .mapTo(actionNames.rightUnhide)

  const state$ = xs
    .merge(leftShoot$, rightShoot$, leftHide$, rightHide$, leftUnhide$, rightUnhide$)
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(uiFromState)
  return {DOM: vtree$}
}

module.exports = main
