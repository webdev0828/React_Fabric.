import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

const initialState = {
  components: [],
  components_type: [],
  _config: {
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: 1,
    redoFinishedStatus: 1,
    undoButton: "",
    redoButton: ""
  },
  saved_id: "",
  load_design: false,
  wrestling_config: {
    width: 21,
    height: 21,
    length_unit: "METER",
    isNewMaterial: false,
    file: "42x42.png"
  },
  flexi_config: {
    width: 20,
    height: 20,
    option_setting: false,
    length_unit: "FEET"
  },
  swain_config: {
    width: 20,
    height: 20,
    option_setting: false,
    length_unit: "FEET"
  },
  wallpad_config: {
    config: [],
    option_setting: false,
    current_wallpad: 0
  },
  wallpad_canvasData: [],
  canvas: null,
  first_canvas: null,
  second_canvas: null,
  third_canvas: null,
  forth_canvas: null,
  canvas_grid: 0,
  mat_type: 0,
  mat_color: "white",
  mat_top: 0,
  mat_left: 0,
  circle_outer_diameter: 32,
  circle_inner_diameter: 10,
  circle_type: "0",
  selectedMaterialColor: null,
  drag_new_rect: false,
  letterSpacingOption: false,
  image_url: "",
  selected_text: "Sample Text",
  template_type: "",
  template_top: 0,
  template_left: 0,
  drag_new_template: false,
  templates_width: {
    template1: { width: 4, height: 3 },
    template2: { width: 4, height: 4 },
    template3: { width: 4, height: 3 },
    template4: { width: 6, height: 6 },
    template5: { width: 15, height: 8 },
    template6: { width: 8, height: 8 },
    template7: { width: 14, height: 14 },
    template8: { width: 4, height: 4 },
    template9: { width: 6, height: 6 },
    template10: { width: 4, height: 4 },
    template11: { width: 6, height: 6 },
    template12: { width: 4, height: 4 },
    template13: { width: 4, height: 4 },
    template14: { width: 8, height: 8 },
    template15: { width: 26, height: 14 }
  },
  isCanvasCleared: false,
  text_style: null,
  textColorOption: "fill",
  selectedGroupType: 0,
  flexi_type: "smooth",
  flexi_material_changed: false,
  flexi_smooth_index: 2,
  flexi_tatami_index: 2,
  flexi_carpet_index: 2,
  flexi_smooth_colors: [
    ["#d4d2ca", "#ffffff"],
    ["#99968d", "#c4c8c9"],
    ["#b7930d", "#e5c65c"],
    ["#9f4d03", "#ff7900"],
    ["#66081c", "#b71234"],
    ["#112718", "#284e35"],
    ["#4a122a", "#7d2349"],
    ["#311914", "#522d24"],
    ["#000000", "#0e0000"],
    ["#241634", "#4c306b"],
    ["#222326", "#4e4f53"],
    ["#16243d", "#263e6a"],
    ["#022252", "#0146ad"],
    ["#3e657f", "#65a0c8"],
    ["#2a5737", "#65c883"]
  ],
  flexi_tatami_colors: [
    ["#16243d", "#263e6a"],
    ["#66081c", "#b71234"],
    ["#b7930d", "#e5c65c"],
    ["#000000", "#0e0000"],
    ["#636f5c", "#9db291"],
    ["#d4d2ca", "#ffffff"],
    ["#222326", "#4e4f53"]
  ],
  flexi_carpet_colors: [
    ["#66081c", "#b71234"],
    ["#16243d", "#263e6a"],
    ["#241634", "#4c306b"],
    ["#112718", "#284e35"],
    ["#99968d", "#c4c8c9"],
    ["#222326", "#4e4f53"],
    ["#000000", "#0e0000"],
    ["#4a122a", "#7d2349"],
    ["#053A3E", "#008b95"]
  ],
  circles_mat_info: [
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 0, 0]
    ]
  ],
  oct_mat_info: [
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ],
  artworkPaths: []
};

function reducer(state = [], action) {
  switch (action.type) {
    case "SET_CANVAS":
      return {
        ...state,
        canvas: action.canvas
      };

    case "NEW_TEXT":
      state.components[state.components.length] = action.component;
      return {
        ...state,
        components: state.components
      };

    case "NEW_RECT":
      state.components[state.components.length] = action.component;
      return {
        ...state,
        components: state.components
      };

    case "NEW_RECT_IMAGE":
      return {
        ...state,
        isRectImageCreated: true
      };

    case "NEW_IMAGE":
      state.components[state.components.length] = action.component;
      state.swain_config["option_setting"] = true;
      return {
        ...state,
        components: state.components,
        swain_config: state.swain_config
      };

    case "NEW_TEMPLATE":
      state.components[state.components.length] = action.component;
      return {
        ...state,
        components: state.components
      };

    case "NEW_CURVED_TEXT":
      state.components[state.components.length] = action.component;
      return {
        ...state,
        components: state.components,
        text_style: action.data
      };

    case "SET_CURVEDTEXT_STLYE":
      return {
        ...state,
        text_style: action.data
      };

    case "NEW_RECT_CONFIG":
      return {
        ...state,
        mat_color: action.data.mat_color,
        mat_type: action.data.mat_type
      };

    case "SET_SELECTED_TEXT":
      return {
        ...state,
        selected_text: action.text
      };

    case "DRAG_NEW_RECT":
      return {
        ...state,
        drag_new_rect: action.drag_new_rect
      };

    case "DRAG_NEW_TEMPLATE":
      return {
        ...state,
        drag_new_template: action.drag_new_template
      };

    case "NEW_TEMPLATE_CONFIG":
      return {
        ...state,
        template_type: action.template_type
      };

    case "SET_MATERIAL_POSITION":
      return {
        ...state,
        mat_top: action.data.top,
        mat_left: action.data.left
      };

    case "SET_TEMPLATE_POSITION":
      return {
        ...state,
        template_top: action.data.top,
        template_left: action.data.left
      };

    case "SET_CONFIG":
      return {
        ...state,
        _config: action._config
      };

    case "WALLPAD_SET_CONFIG":
      state.wallpad_config["config"][
        state.wallpad_config.current_wallpad
      ].canvas_config = action._config;
      return {
        ...state,
        _config: action._config,
        wallpad_config: state.wallpad_config
      };

    case "SET_IMAGE_URL":
      return {
        ...state,
        image_url: action.image_url
      };

    case "SET_SAVED_ID":
      state.flexi_config.option_setting = true;
      state.swain_config.option_setting = true;
      state.wallpad_config.option_setting = true;
      return {
        ...state,
        saved_id: action.id,
        load_design: true,
        flexi_config: state.flexi_config,
        swain_config: state.swain_config,
        wallpad_config: state.wallpad_config
      };

    case "DISABLE_DESIGN_LOAD":
      return {
        ...state,
        load_design: false
      };

    case "SET_WRESTLING_CONFIG":
      switch (action._config.file) {
        case "oct24.png":
        case "oct30.png":
          state.circle_type = "0-0";
          break;
        case "42x42.png":
          state.circle_type = "0";
          break;
        case "36x36.png":
        case "30x30.png":
          state.circle_type = "2";
          break;
        default:
          state.circle_type = "1";
          break;
      }
      return {
        ...state,
        wrestling_config: action._config,
        circle_type: state.circle_type
      };

    case "SET_SWAIN_CONFIG":
      return {
        ...state,
        swain_config: action._config
      };

    case "SET_FLEXI_CONFIG":
      return {
        ...state,
        flexi_config: action._config
      };

    case "SET_CANVAS_GRID":
      return {
        ...state,
        canvas_grid: action.grid
      };

    case "SET_SELECTEED_MATERIAL_COLOR":
      return {
        ...state,
        selectedMaterialColor: action.color
      };

    case "SET_LETTER_SPACING_OPTION":
      return {
        ...state,
        letterSpacingOption: action.option
      };

    case "SET_COMPONENT_TYPE":
      state.components_type[state.components_type.length] =
        action.component_type;
      return {
        ...state,
        components_type: state.components_type,
        flexi_type: action.component_type
      };

    case "SET_GROUP_SELECT":
      return {
        ...state,
        selectedGroupType: action.groupType
      };

    case "SET_FLEXI_MATERIAL_CHANGED":
      return {
        ...state,
        flexi_material_changed: action.changed
      };

    case "SET_FLEXI_SMOOTH_COLOR_INDEX":
      return {
        ...state,
        flexi_smooth_index: action.index
      };

    case "SET_FLEXI_TATAMI_COLOR_INDEX":
      return {
        ...state,
        flexi_tatami_index: action.index
      };

    case "SET_FLEXI_CARPET_COLOR_INDEX":
      return {
        ...state,
        flexi_carpet_index: action.index
      };

    case "SET_SELECTED_CIRCLE_TYPE":
      return {
        ...state,
        circle_type: action.id
      };

    case "SET_CURRENT_WALLPAD":
      console.log(state.wallpad_config["config"][action.index]);
      state.wallpad_config.current_wallpad = action.index;
      state.canvas = state.wallpad_config["config"][action.index].canvas;
      state._config =
        state.wallpad_config["config"][action.index].canvas_config;
      return {
        ...state,
        wallpad_config: state.wallpad_config,
        canvas: state.canvas,
        _config: state._config
      };

    case "ARTWRORK_PATH":
      return {
        ...state,
        artworkPaths: action.paths
      };

    case "CLAER_CANVAS":
      if (action.isCanvasCleared) {
        let new_config = {
          canvasState: [],
          currentStateIndex: -1,
          undoStatus: false,
          redoStatus: false,
          undoFinishedStatus: 1,
          redoFinishedStatus: 1,
          undoButton: "",
          redoButton: ""
        };
        return {
          ...state,
          isCanvasCleared: action.isCanvasCleared,
          _config: new_config
        };
      }

      return {
        ...state,
        isCanvasCleared: action.isCanvasCleared
      };

    case "SET_BACKGROUND_COLOR":
      return {
        ...state,
        mat_color: action.color
      };

    case "SET_WALLPAD_CANVAS":
      state.wallpad_config["config"][action.index].canvas = action.canvas;
      return {
        ...state,
        wallpad_config: state.wallpad_config
      };

    case "SET_WALLPAD_CONFIG":
      state.wallpad_config.option_setting = true;
      return {
        ...state,
        wallpad_config: state.wallpad_config
      };

    case "SET_WALLPAD":
      state.wallpad_config["config"][state.wallpad_config["config"].length] = {
        width: action.length / 1,
        height: 6,
        canvas: null,
        canvas_grid: null,
        canvas_config: {
          canvasState: [],
          currentStateIndex: -1,
          undoStatus: false,
          redoStatus: false,
          undoFinishedStatus: 1,
          redoFinishedStatus: 1,
          undoButton: "",
          redoButton: ""
        }
      };
      return {
        ...state,
        wallpad_config: state.wallpad_config
      };

    case "SET_SAVED_WALLPAD":
      console.log(action.idx);
      state.wallpad_config["config"][action.idx] = {
        width: action.config.width / 1,
        height: 6,
        canvas: action.canvas,
        canvas_grid: null,
        canvas_config: {
          canvasState: [],
          currentStateIndex: -1,
          undoStatus: false,
          redoStatus: false,
          undoFinishedStatus: 1,
          redoFinishedStatus: 1,
          undoButton: "",
          redoButton: ""
        }
      };
      console.log(state.wallpad_config);
      return {
        ...state,
        wallpad_config: state.wallpad_config
      };

    case "SAVE_WALLPAD_CANVAS_DATA":
      action.data.map(data => {
        state.wallpad_config["config"][
          state.wallpad_config["config"].length
        ] = {
          width: data.config.width / 1,
          height: 6,
          canvas: null,
          canvas_grid: null,
          canvas_config: {
            canvasState: [],
            currentStateIndex: -1,
            undoStatus: false,
            redoStatus: false,
            undoFinishedStatus: 1,
            redoFinishedStatus: 1,
            undoButton: "",
            redoButton: ""
          }
        };
        state.wallpad_canvasData[state.wallpad_canvasData.length] =
          action.data.data;
      });

      return {
        ...state,
        wallpad_canvasData: state.wallpad_canvasData
      };

    case "SET_TEXT_COLOR_OPTION":
      return {
        ...state,
        textColorOption: action.option
      };

    default:
      return state;
  }
}

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
