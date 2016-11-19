const xs = require('xstream').default
const keyFromEvent = require('./key-from-event')
const {
  actionNames: {
    leftShoot,
    rightShoot,
    leftHide,
    rightHide,
    leftUnhide,
    rightUnhide
  }
} = require('./constants')

const arenaActionsFromDOMSource = DOMSource => {
  const arenaDOMs = DOMSource.select('.arena')
  const keypressEvents = arenaDOMs
    .events('keypress')
    .map(keyFromEvent)
  const leftShootActions = keypressEvents
    .filter(key => key === 'z')
    .mapTo({ name: leftShoot })
  const rightShootActions = keypressEvents
    .filter(key => key === '/')
    .mapTo({ name: rightShoot })

  const keydownEvents = arenaDOMs
    .events('keydown')
    .map(keyFromEvent)
  const leftHideActions = keydownEvents
    .filter(key => key === 'a')
    .mapTo({ name: leftHide })
  const rightHideActions = keydownEvents
    .filter(key => key === '\'')
    .mapTo({ name: rightHide })

  const keyupEvents = arenaDOMs
    .events('keyup')
    .map(keyFromEvent)
  const leftUnhideActions = keyupEvents
    .filter(key => key === 'a')
    .mapTo({ name: leftUnhide })
  const rightUnhideActions = keyupEvents
    .filter(key => key === '\'')
    .mapTo({ name: rightUnhide })

  return xs.merge(
    leftShootActions,
    rightShootActions,
    leftHideActions,
    rightHideActions,
    leftUnhideActions,
    rightUnhideActions
  )
}

module.exports = arenaActionsFromDOMSource
