const { img } = require('@cycle/dom')
const path = require('path')
const urify = require('urify')
const pauseUri = urify(path.join(__dirname, 'pause-game.png'))

const pauseImg = () => {
  return img(
    {
      style: {
        width: '100%'
      },
      attrs: {
        alt: 'Game Paused',
        src: pauseUri
      }
    }
  )
}

module.exports = pauseImg
