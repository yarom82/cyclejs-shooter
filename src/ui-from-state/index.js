const { div } = require('@cycle/dom')
const arena = require('./arena')

const uiFromState = ({leftHiding, rightHiding}) => {
  return div(
    {
      style: {textAlign: 'center'}
    },
    [
      arena(leftHiding, rightHiding)
    ]
  )
}

module.exports = uiFromState
