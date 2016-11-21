const html = require('yo-yo')

module.exports = beers

function beers (state, dispatch) {
  return html`
      <div id="beers">
        ${state.beers.map((beer) => {
          return html`
            <div class='beer'>
              <h2>${beer.name}</h2>
              <h3>Brewery: ${beer.brewery}</h3>
              <button
                onclick=${
                  () => dispatch({type: 'CHANGE_VIEW', payload: beer.style})
                }
              >
                ${beer.style}
              </button>
            </div>
            `
        })}
      </div>`
}
