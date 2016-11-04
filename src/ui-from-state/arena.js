const { div } = require('@cycle/dom')
const R = require('ramda')
const player = require('./player')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')
const barrier = '='

const arena = (leftHiding, rightHiding) => {
  return div(
    {
      class: {arena: true},
      attrs: {tabindex: 0},
      style: {fontFamily: 'monospace'}
    },
    [
      leftPlayer(leftHiding),
      barrier,
      rightPlayer(rightHiding)
    ]
  )
}

module.exports = arena
