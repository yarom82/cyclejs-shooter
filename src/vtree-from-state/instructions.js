const h = require('./h')
const { br } = require('@cycle/dom')

const beforeWin = h('instructions',
  [
    'Left: hold A to hide; press Z to shoot.',
    br(),
    'Right: hold " to hide; press / to shoot.'
  ]
)

const afterWin = h('instructions',
  'Reload page to play again.'
)

const instructions = state => {
  return {
    'BEFORE_WIN': beforeWin,
    'AFTER_WIN': afterWin
  }[state]
}

module.exports = instructions
