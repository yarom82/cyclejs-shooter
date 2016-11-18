const { test } = require('ava')
const instructions = require('./instructions')
const { div, br } = require('@cycle/dom')

const expectedVtreeForArg = {
  'BEFORE_WIN': div(
    [
      'Left: hold A to hide; press Z to shoot.',
      br(),
      'Right: hold " to hide; press / to shoot.'
    ]
  ),
  'AFTER_WIN': div(
    'Reload page to play again.'
  )
}

for (const arg in expectedVtreeForArg) {
  test(`vtree given '${arg}'`, t => {
    const expected = expectedVtreeForArg[arg]
    const actual = instructions(arg)
    t.deepEqual(actual, expected)
  })
}
