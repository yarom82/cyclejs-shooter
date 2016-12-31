const xs = require('xstream').default
const keyFromEvent = event => event.key
const {
  actionNames: {
    shoot,
    hide,
    unhide,
    pause
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
const pauseGameAction = action(pause)
const { selector } = require('./vtree-from-state/viewport')

const viewportActionsFromDOMSource = DOMSource => {
  const viewportDOMSource = DOMSource.select(selector)

  const keydownEvents = viewportDOMSource
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
  const pauseGameActions = keydownEvents
    .filter(key => key === 'p')
    .mapTo(pauseGameAction)

  const keyupEvents = viewportDOMSource
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
    rightUnhideActions,
    pauseGameActions
  )
}

module.exports = viewportActionsFromDOMSource
