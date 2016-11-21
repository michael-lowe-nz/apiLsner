const html = require('yo-yo')
const redux = require('redux')
const request = require('superagent')
const morphdom = require('morphdom')

const reducer = require('./reducer')
const sampleBeers = require('./sampleBeers')

var main = document.querySelector('main')

console.log("We are getting index.js stuff")

const initialState = {
  beers: [
  ]
}

var store = redux.createStore(reducer, initialState)

store.subscribe(function () {
  var state = store.getState()
  var view = render(state, store.dispatch)
  html.update(app, view)
})

// var app = document.createElement('div') // ??? why doesn't this work
const app = render(initialState, store.dispatch)
main.appendChild(app)

// setTimeout((err, res)=>{
//   store.dispatch({type: 'RECEIVE_BEERS', payload: sampleBeers})
//   console.log('hello we are timeout')
// }, 2000)

request
  .get('https://rogue-beers.herokuapp.com/api/v1/beers')
  .end((error, response) => {
    if (error) {
      console.log("Ahhhh error", error)
    }
    else {
      store.dispatch({type: 'RECEIVE_BEERS', payload: response.body})
      console.log('Api working, well done!')
      // store.dispatch({type: 'TOGGLE_LOADING'})
      // console.log(store.getState())
    }
  })

function render(state, dispatch) {
  console.log('state updating', state, state.beers.length)
  if (state.beers.length < 1) {
    return html`<h2>Loading...</h2>`
  } else {
    console.log('trying')
    return html`
      <div id="app">
        ${state.beers.map((beer) => {
          return html`
            <div class='beer'>
              <h2>${beer.name}</h2>
              <h3>${beer.brewery}</h3>
              <p>${beer.style}</p>
            </div>
            `
        })}
      </div>`
  }
}

store.dispatch({type: 'INIT'})
