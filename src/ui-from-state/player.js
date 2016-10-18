const { span } = require('@cycle/dom')

const player = (side, hiding) => {
  return span(
    {style: {
      display: 'inline-block',
      transform: side === 'right' ? 'scale(-1,1)' : null
    }},
    hiding ? 'd' : 'D'
  )
}

module.exports = player
