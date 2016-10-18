const player = require('./player')
const { test } = require('ava')
const R = require('ramda')
const { span } = require('@cycle/dom')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')

test('`player` left hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: null
    }},
    'd'
  )
  t.deepEqual(leftPlayer(true), expected)
})

test('`player` left not hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: null
    }},
    'D'
  )
  t.deepEqual(leftPlayer(false), expected)
})

test('`player` right hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: 'scale(-1,1)'
    }},
    'd'
  )
  t.deepEqual(rightPlayer(true), expected)
})

test('`player` right not hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: 'scale(-1,1)'
    }},
    'D'
  )
  t.deepEqual(rightPlayer(false), expected)
})
