const { test } = require('ava')
const { img } = require('@cycle/dom')
const path = require('path')
const urify = require('urify')
const pauseUri = urify(path.join(__dirname, 'pause-game.png'))
const pauseImg = require('./pause-img')

test('vtree', t => {
  const expected = img(
    {
      style: {
        width: '100%'
      },
      attrs: {
        alt: 'Game Paused',
        src: pauseUri
      }
    }
  )
  t.deepEqual(pauseImg(), expected)
})
