const { test } = require('ava')
const mock = require('mock-require')
const { div } = require('@cycle/dom')

const playerStub = (side, hiding) => `${side}, ${hiding}`
mock('./player', playerStub)

const uiFromState = require('.')

const divData = {
  attrs: {tabindex: 0},
  style: {fontFamily: 'monospace', textAlign: 'center'}
}
const barrier = '='

test('left hiding, right hiding', t => {
  const expected = div(
    divData,
    [
      'left, true',
      barrier,
      'right, true'
    ]
  )
  const actual = uiFromState({leftHiding: true, rightHiding: true})

  t.deepEqual(actual, expected)
})

test('left hiding, right not hiding', t => {
  const expected = div(
    divData,
    [
      'left, true',
      barrier,
      'right, false'
    ]
  )
  const actual = uiFromState({leftHiding: true, rightHiding: false})

  t.deepEqual(actual, expected)
})

test('left not hiding, right hiding', t => {
  const expected = div(
    divData,
    [
      'left, false',
      barrier,
      'right, true'
    ]
  )
  const actual = uiFromState({leftHiding: false, rightHiding: true})

  t.deepEqual(actual, expected)
})

test('left not hiding, right not hiding', t => {
  const expected = div(
    divData,
    [
      'left, false',
      barrier,
      'right, false'
    ]
  )
  const actual = uiFromState({leftHiding: false, rightHiding: false})

  t.deepEqual(actual, expected)
})
