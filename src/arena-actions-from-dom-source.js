const xs = require('xstream').default
const keyFromEvent = event => event.key
const {actionNames} = require('./constants')
const { selector } = require('./vtree-from-state/arena')

const arenaActionsFromDOMSource = DOMSource => {
  const arenaDOMSource = DOMSource.select(selector)
  const keypressEvents = arenaDOMSource
    .events('keypress')
    .map(keyFromEvent)
  const leftShootActions = keypressEvents
    .filter(key => key === 'z')
    .mapTo(actionNames.leftShoot)
  const rightShootActions = keypressEvents
    .filter(key => key === '/')
    .mapTo(actionNames.rightShoot)

  const keydownEvents = arenaDOMSource
    .events('keydown')
    .map(keyFromEvent)
  const leftHideActions = keydownEvents
    .filter(key => key === 'a')
    .mapTo(actionNames.leftHide)
  const rightHideActions = keydownEvents
    .filter(key => key === '\'')
    .mapTo(actionNames.rightHide)

  const keyupEvents = arenaDOMSource
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

module.exports = arenaActionsFromDOMSource
