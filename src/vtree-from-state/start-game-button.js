const { button } = require('@cycle/dom')
const cuid = require('cuid')
const selectorFromId = require('./selector-from-id')

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

startGameButton.selector = selectorFromId(id)
module.exports = startGameButton
