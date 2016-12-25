const arena = require('./arena')
const h = require('./h')
const focusOnElmOfVnode = require('./focus-on-elm-of-vnode')
const cuid = require('cuid')
const selectorFromId = require('./selector-from-id')

const id = cuid()

const viewport = (leftHiding, rightHiding) => {
  return h('viewport',
    {
      attrs: {
        'data-id': id,
        tabindex: 0
      },
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      hook: {
        insert: focusOnElmOfVnode
      }
    },
    [
      arena(leftHiding, rightHiding)
    ]
  )
}

viewport.selector = selectorFromId(id)

module.exports = viewport
