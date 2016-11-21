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
    default:
      return newState
  }
}
