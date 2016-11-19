const { div, span } = require('@cycle/dom')
const R = require('ramda')
const player = require('./player')
const focusOnElmFromVnode = require('./focus-on-elm-from-vnode')
const cuid = require('cuid')
const selectorFromId = require('./selector-from-id')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')

const id = cuid()

const arena = (leftHiding, rightHiding) => {
  return div(
    {
      attrs: {
        'data-id': id,
        tabindex: 0
      },
      style: {
        position: 'relative',
        minHeight: '60px'
      },
      hook: {
        insert: focusOnElmFromVnode
      }
    },
    [
      leftPlayer(leftHiding),
      span(
        {
          style: {
            fontSize: '40px',
            position: 'absolute',
            bottom: '0'
          }
        },
        '|'
      ),
      rightPlayer(rightHiding)
    ]
  )
}

arena.selector = selectorFromId(id)

module.exports = arena
