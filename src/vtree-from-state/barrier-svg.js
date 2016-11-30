const { svg, h } = require('@cycle/dom')

const barrierSvg = () => {
  return svg(
    {
      attrs: {
        viewBox: '0 0 1 9',
        width: '100%'
      }
    },
    [
      h('rect',
        {
          attrs: {
            width: '100%',
            height: '100%'
          }
        }
      )
    ]
  )
}

module.exports = barrierSvg
