const h = require('./h')
const R = require('ramda')
const player = require('./player')
const barrier = require('./barrier')
const focusOnElmOfVnode = require('./focus-on-elm-of-vnode')
const cuid = require('cuid')
const selectorFromId = require('./selector-from-id')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')

const id = cuid()

const arena = (leftHiding, rightHiding) => {
  return h('arena',
    {
      attrs: {
        'data-id': id,
        tabindex: 0
      },
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '60px'
      },
      hook: {
        insert: focusOnElmOfVnode
      }
    },
    [
      leftPlayer(leftHiding),
      barrier(),
      rightPlayer(rightHiding)
    ]
  )
}

arena.selector = selectorFromId(id)

module.exports = arena
