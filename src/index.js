import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'

const initialState = {
  components: [],
  _config: {
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: 1,
    redoFinishedStatus: 1,
    undoButton: '',
    redoButton: '',
  },
  saved_id: '',
  load_design: false,
  wrestling_config: {
    width: 0,
    height: 0,
    option_setting: true,
    length_unit: 'FEET',
  },
}

function reducer(state = [], action) {
  switch (action.type) {
    case 'NEW_TEXT':
      state.components[state.components.length] = action.component
      return {
        ...state,
        components: state.components,
      }
    case 'SET_CONFIG':
      return {
        ...state,
        _config: action._config,
      }
    case 'SET_SAVED_ID':
      return {
        ...state,
        saved_id: action.id,
        load_design: true,
      }
    case 'DISABLE_DESIGN_LOAD':
      return {
        ...state,
        load_design: false,
      }
    case 'SET_WRESTLING_CONFIG':
      return {
        ...state,
        wrestling_config: action._config,
      }

    default:
      return state
  }
}

const store = createStore(reducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
