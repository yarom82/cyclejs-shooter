const arena = require('./arena')
const h = require('./h')

const viewport = (leftHiding, rightHiding) => {
  return h('viewport',
    {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    },
    [
      arena(leftHiding, rightHiding)
    ]
  )
}

module.exports = viewport
