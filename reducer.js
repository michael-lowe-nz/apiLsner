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
    case 'INSERT_STYLE':
      console.log('The style is...', action.payload);
    default:
      return newState
  }
}
