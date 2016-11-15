const xs = require('xstream').default
const keyFromEvent = require('./key-from-event')
const {actionNames} = require('./constants')

const arenaActionsFromDOM = DOM => {
  const arenaDOMs = DOM.select('.arena')
  const keypressEvents = arenaDOMs
    .events('keypress')
    .map(keyFromEvent)
  const leftShootActions = keypressEvents
    .filter(key => key === 'z')
    .mapTo(actionNames.leftShoot)
  const rightShootActions = keypressEvents
    .filter(key => key === '/')
    .mapTo(actionNames.rightShoot)

  const keydownEvents = arenaDOMs
    .events('keydown')
    .map(keyFromEvent)
  const leftHideActions = keydownEvents
    .filter(key => key === 'a')
    .mapTo(actionNames.leftHide)
  const rightHideActions = keydownEvents
    .filter(key => key === '\'')
    .mapTo(actionNames.rightHide)

  const keyupEvents = arenaDOMs
    .events('keyup')
    .map(keyFromEvent)
  const leftUnhideActions = keyupEvents
    .filter(key => key === 'a')
    .mapTo(actionNames.leftUnhide)
  const rightUnhideActions = keyupEvents
    .filter(key => key === '\'')
    .mapTo(actionNames.rightUnhide)

  return xs.merge(
    leftShootActions,
    rightShootActions,
    leftHideActions,
    rightHideActions,
    leftUnhideActions,
    rightUnhideActions
  )
}

module.exports = arenaActionsFromDOM
