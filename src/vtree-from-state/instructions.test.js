const { test } = require('ava')
const isEqual = require('lodash.isequal')
const instructions = require('./instructions')
const { br } = require('@cycle/dom')
const h = require('./h')

const elmName = 'instructions'

const divData = {
  style: {
    textAlign: 'center'
  }
}

const expectedVtreeForArg = {
  'BEFORE_WIN': h(elmName,
    divData,
    [
      'Left: hold A to hide; press Z to shoot.',
      br(),
      'Right: hold " to hide; press / to shoot.'
    ]
  ),
  'AFTER_WIN': h(elmName,
    divData,
    'Reload page to play again.'
  )
}

for (const arg in expectedVtreeForArg) {
  test(`vtree given '${arg}'`, t => {
    const expected = expectedVtreeForArg[arg]
    const actual = instructions(arg)
    t.true(isEqual(actual, expected))
  })
}
