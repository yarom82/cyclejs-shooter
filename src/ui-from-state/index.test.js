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

const possibleStateMatrix = [
  {leftHiding: true, rightHiding: true},
  {leftHiding: true, rightHiding: false},
  {leftHiding: false, rightHiding: true},
  {leftHiding: false, rightHiding: false}
]

const forEachPossibleStateMatrix = state => {
  const testNameLeft = state.leftHiding ? 'hiding' : 'not hiding'
  const testNameRight = state.rightHiding ? 'hiding' : 'not hiding'
  const testName = `left ${testNameLeft}, right ${testNameRight}`
  test(testName, t => {
    const expected = div(
      divData,
      [
        `left, ${state.leftHiding}`,
        barrier,
        `right, ${state.rightHiding}`
      ]
    )
    const actual = uiFromState(state)
    t.deepEqual(actual, expected)
  })
}

possibleStateMatrix.forEach(forEachPossibleStateMatrix)
