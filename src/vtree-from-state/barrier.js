const { svg, h } = require('@cycle/dom')

const barrier = () => {
  return svg(
    {
      style: {
        position: 'absolute',
        left: '50%'
      },
      attrs: {
        width: '100%',
        height: '100%'
      }
    },
    [
      h(
        'line',
        {
          attrs: {
            y2: '100%',
            'stroke-width': '2',
            stroke: 'black'
          }
        }
      )
    ]
  )
}

module.exports = barrier
