const { div, br } = require('@cycle/dom')

const beforeWin = div(
  [
    'Left: hold A to hide; press Z to shoot.',
    br(),
    'Right: hold " to hide; press / to shoot.'
  ]
)

const afterWin = div(
  'Reload page to play again.'
)

const instructions = state => {
  if (state === 'BEFORE_WIN') {
    return beforeWin
  }
  if (state === 'AFTER_WIN') {
    return afterWin
  }
}

module.exports = instructions
