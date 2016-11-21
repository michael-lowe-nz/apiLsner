const clone = require('clone')

module.exports = function reducer (state, action) {
  const newState = clone(state)

  switch (action.type) {
    case 'INIT':
      return newState

    case 'RECEIVE_BEERS':
      console.log('Receiving beers...')
      newState.beers = action.payload.beers
      return newState

    case 'CHANGE_VIEW':
      console.log('Changing View to', action.payload)
      newState.view = action.payload
      return newState

    case 'RECEIVE_STYLES':
      console.log('Receiving styles!', action.payload)
      newState.styles = action.payload.styles
      return newState

    default:
      return newState
  }
}
