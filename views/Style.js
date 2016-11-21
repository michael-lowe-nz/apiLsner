const html = require('yo-yo')

module.exports = Style

function Style (state, dispatch) {
  return html`
      <div id="styles">
        <button
          onclick=${ () => {dispatch({type: 'CHANGE_VIEW', payload: 'all'})} }
          >EXIT
        </button>
      </div>`
}
