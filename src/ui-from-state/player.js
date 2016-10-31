const { img } = require('@cycle/dom')
const path = require('path')
const urify = require('urify')
const standingUri = urify(path.join(__dirname, 'player-not-hiding.png'))
const hidingUri = urify(path.join(__dirname, 'player-hiding.png'))

const player = (side, hiding) => {
  return img(
    {
      attrs: {
        alt: hiding ? 'd' : 'D',
        src: hiding ? hidingUri : standingUri
      },
      style: {
        position: 'absolute',
        bottom: 0,
        [side]: 0,
        transform: side === 'right' ? 'scale(-1,1)' : null
      }
    }
  )
}

module.exports = player
