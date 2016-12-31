const h = require('./h')
const pauseImg = require('./pause-img')

const pause = () => {
  return h('pause-overlay',
    {
      style: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(150, 150, 150, 0.8)'
      }
    },
    [
      h('pause',
        {
          style: {
            display: 'flex',
            alignItems: 'flex-end',
            flexBasis: '14%'
          }
        },
        [
          pauseImg()
        ]
      )
    ]
  )
}

module.exports = pause
