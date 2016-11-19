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
const { selector } = require('./vtree-from-state/arena')

const arenaActionsFromDOMSource = DOMSource => {
  const arenaDOMSource = DOMSource.select(selector)
  const keypressEvents = arenaDOMSource
    .events('keypress')
    .map(keyFromEvent)
  const leftShootActions = keypressEvents
    .filter(key => key === 'z')
    .mapTo({ name: leftShoot })
  const rightShootActions = keypressEvents
    .filter(key => key === '/')
    .mapTo({ name: rightShoot })

  const keydownEvents = arenaDOMSource
    .events('keydown')
    .map(keyFromEvent)
  const leftHideActions = keydownEvents
    .filter(key => key === 'a')
    .mapTo({ name: leftHide })
  const rightHideActions = keydownEvents
    .filter(key => key === '\'')
    .mapTo({ name: rightHide })

  const keyupEvents = arenaDOMSource
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
