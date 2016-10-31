const player = require('./player')
const { test } = require('ava')
const { span } = require('@cycle/dom')

const possibleCallArgs = [
  ['left', false],
  ['left', true],
  ['right', false],
  ['right', true]
]

const testWithCallArgs = ([side, hiding]) => {
  const testName = `vtree when side: ${side}, hiding: ${hiding}`
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: side === 'left' ? null : 'scale(-1,1)'
    }},
    hiding ? 'd' : 'D'
  )
  test(testName, t => {
    t.deepEqual(player(side, hiding), expected)
  })
}

possibleCallArgs.forEach(testWithCallArgs)
