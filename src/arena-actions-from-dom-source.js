const xs = require('xstream').default
const keyFromEvent = event => event.key
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
const action = require('./action')

const leftShootAction = action(leftShoot)
const rightShootAction = action(rightShoot)
const leftHideAction = action(leftHide)
const rightHideAction = action(rightHide)
const leftUnhideAction = action(leftUnhide)
const rightUnhideAction = action(rightUnhide)
const { selector } = require('./vtree-from-state/arena')

const arenaActionsFromDOMSource = DOMSource => {
  const arenaDOMSource = DOMSource.select(selector)
  const keypressEvents = arenaDOMSource
    .events('keypress')
    .map(keyFromEvent)
  const leftShootActions = keypressEvents
    .filter(key => key === 'z')
    .mapTo(leftShootAction)
  const rightShootActions = keypressEvents
    .filter(key => key === '/')
    .mapTo(rightShootAction)

  const keydownEvents = arenaDOMSource
    .events('keydown')
    .map(keyFromEvent)
  const leftHideActions = keydownEvents
    .filter(key => key === 'a')
    .mapTo(leftHideAction)
  const rightHideActions = keydownEvents
    .filter(key => key === '\'')
    .mapTo(rightHideAction)

  const keyupEvents = arenaDOMSource
    .events('keyup')
    .map(keyFromEvent)
  const leftUnhideActions = keyupEvents
    .filter(key => key === 'a')
    .mapTo(leftUnhideAction)
  const rightUnhideActions = keyupEvents
    .filter(key => key === '\'')
    .mapTo(rightUnhideAction)

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
