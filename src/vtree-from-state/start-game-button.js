const { button } = require('@cycle/dom')
const cuid = require('cuid')

const id = cuid()

const vnode = button(
  {
    attrs: {
      'data-id': id
    },
    style: {
      textTransform: 'uppercase'
    }
  },
  'Start the game'
)

const startGameButton = () => vnode

startGameButton.selector = `[data-id='${id}']`
module.exports = startGameButton
