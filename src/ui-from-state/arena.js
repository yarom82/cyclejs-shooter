const { div, span } = require('@cycle/dom')
const R = require('ramda')
const player = require('./player')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')

const arena = (leftHiding, rightHiding) => {
  return div(
    {
      attrs: {tabindex: 0},
      style: {
        position: 'relative',
        minHeight: '60px'
      }
    },
    [
      leftPlayer(leftHiding),
      span(
        {
          style: {
            fontSize: '40px',
            position: 'absolute',
            bottom: 0
          }
        },
        '|'
      ),
      rightPlayer(rightHiding)
    ]
  )
}

module.exports = arena
