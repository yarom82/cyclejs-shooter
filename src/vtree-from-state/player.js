const { div } = require('@cycle/dom')
const playerImg = require('./player-img')
const R = require('ramda')

const curriedPlayerImg = R.curry(playerImg)
const standingPlayerImg = curriedPlayerImg(false)
const hidingPlayerImg = curriedPlayerImg(true)

const player = (side, hiding) => {
  return div(
    {
      style: {
        position: 'absolute',
        width: '15%',
        bottom: '0',
        [side]: '0',
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
