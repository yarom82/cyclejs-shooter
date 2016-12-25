const h = require('./h')
const R = require('ramda')
const player = require('./player')
const barrier = require('./barrier')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')

const arena = (leftHiding, rightHiding) => {
  return h('arena',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    },
    [
      leftPlayer(leftHiding),
      barrier(),
      rightPlayer(rightHiding)
    ]
  )
}

module.exports = arena
