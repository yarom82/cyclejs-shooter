const { div } = require('@cycle/dom')
const barrierSvg = require('./barrier-svg')

const barrier = () => {
  return div(
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
