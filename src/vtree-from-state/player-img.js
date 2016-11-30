const { img } = require('@cycle/dom')
const path = require('path')
const urify = require('urify')
const standingUri = urify(path.join(__dirname, 'player-not-hiding.png'))
const hidingUri = urify(path.join(__dirname, 'player-hiding.png'))

const playerImg = (hiding, displayNone) => {
  return img({
    style: {
      width: '100%',
      display: displayNone ? 'none' : 'unset'
    },
    attrs: {
      alt: hiding ? 'd' : 'D',
      src: hiding ? hidingUri : standingUri
    }
  })
}

module.exports = playerImg
