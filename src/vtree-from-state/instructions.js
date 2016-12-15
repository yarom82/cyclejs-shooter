const h = require('./h')
const { br } = require('@cycle/dom')

const beforeWin = [
  'Left: hold A to hide; press Z to shoot.',
  br(),
  'Right: hold " to hide; press / to shoot.'
]

const afterWin = 'Reload page to play again.'

const instructions = state => {
  return h('instructions',
    {
      style: {
        textAlign: 'center'
      }
    },
    {
      'BEFORE_WIN': beforeWin,
      'AFTER_WIN': afterWin
    }[state]
  )
}

module.exports = instructions
