const { h } = require('@cycle/dom')
const namePrefix = 'shooter-'

const hWithNamePrefix = (sel, ...args) => h(namePrefix + sel, ...args)
module.exports = hWithNamePrefix
