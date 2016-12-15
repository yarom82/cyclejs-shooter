const h = require('./h')
const { button } = require('@cycle/dom')
const cuid = require('cuid')
const selectorFromId = require('./selector-from-id')

const id = cuid()

const vnode = h('start-game-button',
  {
    attrs: {
      'data-id': id
    },
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  [
    button('START THE GAME')
  ]
)

const startGameButton = () => vnode

startGameButton.selector = selectorFromId(id)
module.exports = startGameButton
