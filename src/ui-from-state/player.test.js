const player = require('./player')
const path = require('path')
const urify = require('urify')
const standingUri = urify(path.join(__dirname, 'player-not-hiding.png'))
const hidingUri = urify(path.join(__dirname, 'player-hiding.png'))
const { test } = require('ava')
const { img } = require('@cycle/dom')

const possibleCallArgs = [
  ['left', false],
  ['left', true],
  ['right', false],
  ['right', true]
]

const testWithCallArgs = ([side, hiding]) => {
  const testName = `vtree when side: ${side}, hiding: ${hiding}`
  const expected = img(
    {
      attrs: {
        alt: hiding ? 'd' : 'D',
        src: hiding ? hidingUri : standingUri
      },
      style: {
        position: 'absolute',
        bottom: '0',
        [side]: '0',
        transform: side === 'right' ? 'scale(-1,1)' : null
      }
    }
  )
  test(testName, t => {
    t.deepEqual(player(side, hiding), expected)
  })
}

possibleCallArgs.forEach(testWithCallArgs)
