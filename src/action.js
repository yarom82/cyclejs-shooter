const action = (name, payload) => {
  const newAction = Object.assign({ [action.nameKey]: name }, payload)
  return Object.freeze(newAction)
}

action.nameKey = Symbol('action name key')
module.exports = action
