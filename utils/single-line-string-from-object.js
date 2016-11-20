const stringify = require('stringify-object')
const stringifyOptions = {
  inlineCharacterLimit: 999
}
const {
  curryN,
  __: _
} = require('ramda')

const singleLineStringFromObject = curryN(2, stringify)(_, stringifyOptions)
module.exports = singleLineStringFromObject
