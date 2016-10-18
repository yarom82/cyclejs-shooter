const player = require('./player')
const { test } = require('ava')
const R = require('ramda')
const { span } = require('@cycle/dom')

const curriedPlayer = R.curry(player)
const leftPlayer = curriedPlayer('left')
const rightPlayer = curriedPlayer('right')

test('left hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: null
    }},
    'd'
  )
  t.deepEqual(leftPlayer(true), expected)
})

test('left not hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: null
    }},
    'D'
  )
  t.deepEqual(leftPlayer(false), expected)
})

test('right hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: 'scale(-1,1)'
    }},
    'd'
  )
  t.deepEqual(rightPlayer(true), expected)
})

test('right not hiding', t => {
  const expected = span(
    {style: {
      display: 'inline-block',
      transform: 'scale(-1,1)'
    }},
    'D'
  )
  t.deepEqual(rightPlayer(false), expected)
})
