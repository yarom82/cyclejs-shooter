const { div, span } = require('@cycle/dom')
const R = require('ramda')

const player = (side, hiding) => {
  return span(
    {style: {
      display: 'inline-block',
      transform: side === 'right' ? 'scale(-1,1)' : null
    }},
    hiding ? 'd' : 'D'
  )
}

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')
const barrier = '='

const uiFromState = (state) => {
  return div(
    {
      attrs: {tabindex: 0},
      style: {fontFamily: 'monospace', textAdlign: 'center'}
    },
    [
      leftPlayer(state.leftHiding),
      barrier,
      rightPlayer(state.rightHiding)
    ]
  )
}

module.exports = uiFromState
