const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')
const R = require('ramda')

const playerStub = (...args) => args
mock('./player', R.curryN(2, playerStub))

const uiFromState = require('.')

const divData = {
  attrs: {tabindex: 0},
  style: {fontFamily: 'monospace', textAlign: 'center'}
}
const barrier = '='

test(t => {
  const state = {
    leftHiding: Symbol('leftHiding'),
    rightHiding: Symbol('rightHiding')
  }

  const expected = div(
    divData,
    [
      ['left', state.leftHiding],
      barrier,
      ['right', state.rightHiding]
    ]
  )
  const actual = uiFromState(state)
  t.deepEqual(actual, expected)
})
