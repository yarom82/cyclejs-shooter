const { test } = require('ava')
const isEqual = require('lodash.isequal')
const { img } = require('@cycle/dom')
const path = require('path')
const urify = require('urify')
const standingUri = urify(path.join(__dirname, 'player-not-hiding.png'))
const hidingUri = urify(path.join(__dirname, 'player-hiding.png'))
const playerImg = require('./player-img')

const possibleCallArgs = [
  [false, false],
  [false, true],
  [true, false],
  [true, true]
]

possibleCallArgs.forEach(([hiding, displayNone]) => {
  test(`vtree when hiding: ${hiding}, displayNone: ${displayNone}`, t => {
    const expected = img({
      style: {
        width: '100%',
        display: displayNone ? 'none' : 'unset'
      },
      attrs: {
        alt: hiding ? 'd' : 'D',
        src: hiding ? hidingUri : standingUri
      }
    })

    t.true(isEqual(playerImg(hiding, displayNone), expected))
  })
})
