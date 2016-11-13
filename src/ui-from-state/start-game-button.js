const { button } = require('@cycle/dom')
const cuid = require('cuid')

const className = cuid()

const vnode = button(
  {
    class: {
      [className]: true
    },
    style: {
      textTransform: 'uppercase'
    }
  },
  'Start the game'
)

const startGameButton = () => vnode

startGameButton.className = className
module.exports = startGameButton
