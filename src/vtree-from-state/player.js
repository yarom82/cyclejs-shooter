const h = require('./h')
const playerImg = require('./player-img')
const R = require('ramda')

const curriedPlayerImg = R.curry(playerImg)
const standingPlayerImg = curriedPlayerImg(false)
const hidingPlayerImg = curriedPlayerImg(true)

const player = (side, hiding) => {
  return h('player',
    {
      style: {
        flexBasis: '15%',
        display: 'flex',
        alignItems: 'flex-end',
        transform: side === 'right' ? 'scale(-1,1)' : null
      }
    },
    [
      standingPlayerImg(hiding),
      hidingPlayerImg(!hiding)
    ]
  )
}

module.exports = player
