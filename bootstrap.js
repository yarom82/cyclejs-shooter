const {run} = require('@cycle/run')
const {makeDOMDriver} = require('@cycle/dom')
const shooter = require('.')

const containerId = 'shooter'
const containerElement = document.createElement('div')
containerElement.id = containerId
document.body.appendChild(containerElement)

run(shooter, {DOM: makeDOMDriver(`#${containerId}`)})
