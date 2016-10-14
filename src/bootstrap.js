const {run} = require('@cycle/xstream-run')
const {makeDOMDriver} = require('@cycle/dom')
const shooter = require('.')

const containerElement = document.createElement('div')
containerElement.id = 'shooter'
document.body.appendChild(containerElement)

run(shooter, {DOM: makeDOMDriver('#shooter')})
