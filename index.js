const html = require('yo-yo')
const redux = require('redux')
const request = require('superagent')
const morphdom = require('morphdom')

const reducer = require('./reducer')
const sampleBeers = require('./sampleBeers')

const Beers = require('./views/Beers')
const Style = require('./views/Style')


// var app = document.createElement('div') // ??? why doesn't this work

const state = {
  beers: [],
  view: 'all',
  styles: []
}

var store = redux.createStore(reducer, state)

var main = document.querySelector('main')
var appEl = document.createElement('div')
main.appendChild(appEl)

const app = render(state, store.dispatch)

store.subscribe(function () {
  var state = store.getState()
  var view = render(state, store.dispatch)
  html.update(appEl, view)
})

// var app = document.createElement('div') // ??? why doesn't this work


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
      // store.dispatch({type: 'TOGGLE_LOADING'})
      // console.log(store.getState())
    }
  })



function render(state, dispatch) {
  if(state.view === 'all'){
    return html`
    <div class='app'>
    ${Beers(state, dispatch)}
    </div>
    `
  }
  else {
    return html`
      <div class='beerStyle'>
        ${Style(state, dispatch)}
      </div>
    `
  }
}

store.dispatch({type: 'INIT'})
