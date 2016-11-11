const {
  selectorPrefixes: {action},
  actionNames: {start}
} = require('./constants')

const start$FromDOM = DOM => {
  return DOM
    .select(`.${action}:${start}`)
    .events('click')
    .mapTo(start)
}

module.exports = start$FromDOM
