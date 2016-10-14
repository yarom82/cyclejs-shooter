const makeUI = require('./make-ui')
const xs = require('xstream').default
const initialState = require('./initial-state')
const stateMachine = require('./state-machine')

const getKeyFromEvent = e => e.key

const main = ({DOM}) => {
  const keypress$ = DOM
    .select('document')
    .events('keypress')
    .map(getKeyFromEvent)
  const leftShoot$ = keypress$
    .filter(key => key === 'z')
    .mapTo('LEFT_SHOOT')
  const rightShoot$ = keypress$
    .filter(key => key === '/')
    .mapTo('RIGHT_SHOOT')

  const keydown$ = DOM
    .select('document')
    .events('keydown')
    .map(getKeyFromEvent)
  const leftDown$ = keydown$
    .filter(key => key === 'a')
    .mapTo('LEFT_DOWN')
  const rightDown$ = keydown$
    .filter(key => key === '\'')
    .mapTo('RIGHT_DOWN')

  const keyup$ = DOM
    .select('document')
    .events('keyup')
    .map(getKeyFromEvent)
  const leftUp$ = keyup$
    .filter(key => key === 'a')
    .mapTo('LEFT_UP')
  const rightUp$ = keyup$
    .filter(key => key === '\'')
    .mapTo('RIGHT_UP')

  const state$ = xs
    .merge(leftShoot$, rightShoot$, leftDown$, rightDown$, leftUp$, rightUp$)
    .fold(stateMachine, initialState)

  const vtree$ = state$.map(makeUI)
  return {DOM: vtree$}
}

module.exports = main
