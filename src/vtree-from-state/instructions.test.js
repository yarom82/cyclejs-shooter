const { test } = require('ava')
const instructions = require('./instructions')
const { br } = require('@cycle/dom')
const h = require('./h')

const elmName = 'instructions'

const expectedVtreeForArg = {
  'BEFORE_WIN': h(elmName,
    [
      'Left: hold A to hide; press Z to shoot.',
      br(),
      'Right: hold " to hide; press / to shoot.'
    ]
  ),
  'AFTER_WIN': h(elmName,
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
