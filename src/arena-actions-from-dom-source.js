const xs = require('xstream').default
const keyFromEvent = event => event.key
const {
  actionNames: {
    shoot,
    hide,
    unhide
  },
  actionPayloadKeys: {
    player
  },
  players: {
    rightPlayer,
    leftPlayer
  }
} = require('./constants')
const action = require('./action')

const leftShootAction = action(shoot, { [player]: leftPlayer })
const rightShootAction = action(shoot, { [player]: rightPlayer })
const leftHideAction = action(hide, { [player]: leftPlayer })
const rightHideAction = action(hide, { [player]: rightPlayer })
const leftUnhideAction = action(unhide, { [player]: leftPlayer })
const rightUnhideAction = action(unhide, { [player]: rightPlayer })
const { selector } = require('./vtree-from-state/arena')

const arenaActionsFromDOMSource = DOMSource => {
  const arenaDOMSource = DOMSource.select(selector)

  const keydownEvents = arenaDOMSource
    .events('keydown')
    .map(keyFromEvent)

  const leftShootActions = keydownEvents
    .filter(key => key === 'z')
    .mapTo(leftShootAction)
  const rightShootActions = keydownEvents
    .filter(key => key === '/')
    .mapTo(rightShootAction)

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
