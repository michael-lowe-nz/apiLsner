const html = require('yo-yo')

module.exports = Style

function Style (state, dispatch) {
  const filteredStyles = state.styles.filter((style)=>{
    console.log('Style.shortName: ', style.shortName, ', State.view: ', state.view)
    console.log('Includes?',style.name.includes(state.view))
    return style.shortName.includes(state.view)
  })
  console.log(filteredStyles)
  return html`
      <div id="styles-list">
        <button
          onclick=${ () => {dispatch({type: 'CHANGE_VIEW', payload: 'all'})} }
          >EXIT
        </button>
        <div class="style">
          <h2>
            ${filteredStyles.map((style)=>{
              return singleStyle(style)
            })}
          </h2>
        </div>
      </div>`
}

function singleStyle (style) {
  return html`
    <div>
      <h2> ${style.name} </h2>
    </div>
    `
}
