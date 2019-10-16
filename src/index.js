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
    width: 7,
    height: 7,
    option_setting: true,
    length_unit: 'FEET',
  },
  canvas: null,
  canvas_grid: 0,
  mat_type: 0,
  mat_color: 'blue',
  selectedMaterialColor: null,
  templates: {
    First_Template: [
      {
        x: 0,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 0,
        y: 1,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 1,
        width: 2,
        height: 1,
      },
      {
        x: 0,
        y: 2,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 2,
        width: 2,
        height: 1,
      },
    ],
    Second_Template: [
      {
        x: 0,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 0,
        y: 1,
        width: 1,
        height: 2,
      },
      {
        x: 1,
        y: 1,
        width: 2,
        height: 1,
      },
      {
        x: 1,
        y: 2,
        width: 2,
        height: 1,
      },
      {
        x: 3,
        y: 1,
        width: 1,
        height: 2,
      },
      {
        x: 0,
        y: 3,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 3,
        width: 2,
        height: 1,
      },
    ],
    Third_Template: [
      {
        x: 0,
        y: 0,
        width: 3,
        height: 1,
      },
      {
        x: 0,
        y: 1,
        width: 3,
        height: 1,
      },
      {
        x: 0,
        y: 2,
        width: 3,
        height: 1,
      },
    ],
    Forth_Template: [
      {
        x: 0,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 4,
        y: 0,
        width: 2,
        height: 1,
      },
      {
        x: 0,
        y: 1,
        width: 1,
        height: 2,
      },
      {
        x: 0,
        y: 3,
        width: 1,
        height: 2,
      },
      {
        x: 1,
        y: 1,
        width: 2,
        height: 1,
      },
      {
        x: 3,
        y: 1,
        width: 2,
        height: 1,
      },
      {
        x: 1,
        y: 2,
        width: 1,
        height: 2,
      },
      {
        x: 2,
        y: 2,
        width: 2,
        height: 1,
      },
      {
        x: 2,
        y: 3,
        width: 2,
        height: 1,
      },
      {
        x: 4,
        y: 2,
        width: 1,
        height: 2,
      },
      {
        x: 1,
        y: 4,
        width: 2,
        height: 1,
      },
      {
        x: 3,
        y: 4,
        width: 2,
        height: 1,
      },
    ],
  },
}

function reducer(state = [], action) {
  switch (action.type) {
    case 'SET_CANVAS':
      return {
        ...state,
        canvas: action.canvas,
      }
    case 'NEW_TEXT':
      state.components[state.components.length] = action.component
      return {
        ...state,
        components: state.components,
      }
    case 'NEW_RECT':
      state.components[state.components.length] = action.data.component
      return {
        ...state,
        components: state.components,
        mat_color: action.data.mat_color,
        mat_type: action.data.mat_type,
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
    case 'SET_CANVAS_GRID':
      return {
        ...state,
        canvas_grid: action.grid,
      }
    case 'SET_SELECTEED_MATERIAL_COLOR':
      return {
        ...state,
        selectedMaterialColor: action.color,
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
