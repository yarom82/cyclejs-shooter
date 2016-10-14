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

const curriedMkPlayer = R.curry(player)
const leftPlayer = curriedMkPlayer('left')
const rightPlayer = curriedMkPlayer('right')
const barrier = '='

const makeUI = (state) => {
  return div(
    {style: {fontFamily: 'monospace', textAlign: 'center'}},
    [
      leftPlayer(state.leftPlayerDown),
      barrier,
      rightPlayer(state.rightPlayerDown)
    ]
  )
}

module.exports = makeUI
