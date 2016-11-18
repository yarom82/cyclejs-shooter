const xs = require('xstream').default
const keyFromEvent = require('./key-from-event')
const {actionNames} = require('./constants')

const arenaAction$FromDOMSource = DOMSource => {
  const arenaDOMSource = DOMSource.select('.arena')
  const keypress$ = arenaDOMSource
    .events('keypress')
    .map(keyFromEvent)
  const leftShoot$ = keypress$
    .filter(key => key === 'z')
    .mapTo(actionNames.leftShoot)
  const rightShoot$ = keypress$
    .filter(key => key === '/')
    .mapTo(actionNames.rightShoot)

  const keydown$ = arenaDOMSource
    .events('keydown')
    .map(keyFromEvent)
  const leftHide$ = keydown$
    .filter(key => key === 'a')
    .mapTo(actionNames.leftHide)
  const rightHide$ = keydown$
    .filter(key => key === '\'')
    .mapTo(actionNames.rightHide)

  const keyup$ = arenaDOMSource
    .events('keyup')
    .map(keyFromEvent)
  const leftUnhide$ = keyup$
    .filter(key => key === 'a')
    .mapTo(actionNames.leftUnhide)
  const rightUnhide$ = keyup$
    .filter(key => key === '\'')
    .mapTo(actionNames.rightUnhide)

  return xs.merge(
    leftShoot$,
    rightShoot$,
    leftHide$,
    rightHide$,
    leftUnhide$,
    rightUnhide$
  )
}

module.exports = arenaAction$FromDOMSource
