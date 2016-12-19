const h = require('./h')
const barrierSvg = require('./barrier-svg')

const barrier = () => {
  return h('barrier',
    {
      style: {
        flexBasis: '1%',
        display: 'flex',
        alignItems: 'flex-end'
      }
    },
    [
      barrierSvg()
    ]
  )
}

module.exports = barrier
