import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import $ from 'jquery'

class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 400,
    height: 400,
  }

  state = {
    canvas: null,
  }

  componentDidUpdate() {
    const load_design = this.props.load_design
    const saved_id = this.props.saved_id
    if (load_design) {
      axios
        .post('http://localhost:3001/load_design', { id: saved_id })
        .then(res => {
          let tempConfig = res.data
          this.props.canvas.loadFromJSON(
            tempConfig.canvasState[tempConfig.currentStateIndex],
            () => {
              this.props.canvas.renderAll()
            },
          )
          this.props.setCanvasConfig(tempConfig)
          this.props.setDisableLoad()
        })
    }
  }

  componentDidMount() {
    const canvas = new window.fabric.Canvas(this.c)
    // this.setState({ canvas })
    const config = this.props.wrestling_config

    let grid = (this.props.width - 1) / config.width
    let unitScale = (this.props.width - 1) / config.width
    let canvasWidth = config.width * unitScale
    let canvasHeight = config.height * unitScale

    this.props.setCanvasGrid(grid)
    let not_add_flag = false

    for (let i = 0; i <= config.width; i++) {
      canvas.add(
        new window.fabric.Line([i * grid, 0, i * grid, canvasHeight], {
          type: 'line',
          stroke: '#716b6b',
          selectable: false,
        }),
      )
    }

    for (let i = 0; i <= config.height; i++) {
      canvas.add(
        new window.fabric.Line([0, i * grid, canvasWidth, i * grid], {
          type: 'line',
          stroke: '#716b6b',
          selectable: false,
        }),
      )
    }

    canvas.on('object:selected', () => {
      let activeObject = this.props.canvas._activeObject
      if (activeObject.type === 'text') {
        $('.second-menu').hide()
        $('#text').show()

        // font size
        let fontSize = activeObject.get('fontSize')
        $('.slct-font-size').val(`${fontSize}px`)

        // font weight
        let fontWeight = activeObject.get('fontWeight')
        if (fontWeight === 'bold') {
          $('#bold').addClass('active')
        }

        // font style
        let fontStyle = activeObject.get('fontStyle')
        if (fontStyle === 'italic') {
          $('#italic').addClass('active')
        }

        // text decoration
        let textDecoration = activeObject.get('textDecoration')
        if (textDecoration === 'underline') {
          $('#underline').addClass('active')
        }

        // capital text
        let capitalText = activeObject.text
        if (capitalText === capitalText.toUpperCase()) {
          $('#capital').addClass('active')
        }

        // text align
        let text_align = activeObject.get('textAlign')
        switch (text_align) {
          case 'left':
            $('#left-align').addClass('active')
            break
          case 'center':
            $('#center-align').addClass('active')
            break
          case 'right':
            $('#right-align').addClass('active')
            break
          default:
            break
        }

        // line heigth
        let line_height = activeObject.get('lineHeight')
        $('#line_ht_get').val(Math.floor(line_height))
        $('#line_ht_set').val(Math.floor(line_height))
        $('#line_ht_get').css({
          background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${(line_height /
            10) *
            10}%, #fff ${(line_height / 10) * 10}%, #fff 100%)`,
        })

        // spacing

        // text color
        let text_color = activeObject.get('fill')
        $('#text-color-bind').css({ background: text_color })

        // outline width
        let outline_width = activeObject.get('strokeWidth')
        $('#size_get').val(outline_width)
        $('#size_set').val(outline_width)
        $('#size_get').css({
          background: `linear-gradient(to right, #1baa92 0%, #1baa92 ${outline_width *
            10}%, #fff ${outline_width * 10}%, #fff 100%)`,
        })

        // outline color
        let stroke_color = activeObject.get('stroke')
        $('#outline-color-bind').css({ background: stroke_color })

        // text style (arc)
      } else {
        $('.material-color-pane').css({ visibility: 'visible' })
        let selectedColor = activeObject.get('fill')
        this.props.setSelectedMaterialColor(selectedColor)
      }
    })

    canvas.on('selection:cleared', () => {
      $('.material-color-pane').css({ visibility: 'hidden' })

      $('#bold').removeClass('active')
      $('#italic').removeClass('active')
      $('#underline').removeClass('active')
      $('#capital').removeClass('active')
      $('#left-align').removeClass('active')
      $('#center-align').removeClass('active')
      $('#right-align').removeClass('active')
      $('.slct-font-size').val($('.slct-font-size option:first').val())
      $('.slct-font-fam').val($('.slct-font-fam option:first').val())
      $('#line_ht_get').val(1)
      $('#line_ht_get').css({
        background: `linear-gradient(to right, #1baa92 0%, #1baa92 5%, #fff 5%, #fff 100%)`,
      })
      $('#line_ht_set').val(1)
      $('#text-color-bind').css({ background: 'black' })
      $('#size_get').val(0)
      $('#size_get').css({
        background: `linear-gradient(to right, #1baa92 0%, #1baa92 5%, #fff 5%, #fff 100%)`,
      })
      $('#size_set').val(0)
      $('#outline-color-bind').css({ background: 'black' })
    })

    canvas.on('object:added', () => {
      if (!this.props.load_design) this.updateCanvasState()
    })

    canvas.on('object:modified', () => {
      if (!this.props.load_design) this.updateCanvasState()
    })

    this.props.setCanvas(canvas)
  }

  updateCanvasState = () => {
    let tempConfig = this.props._config
    if (tempConfig.undoStatus === false && tempConfig.redoStatus === false) {
      let jsonData = this.props.canvas.toJSON()
      let canvasAsJson = JSON.stringify(jsonData)
      if (tempConfig.currentStateIndex < tempConfig.canvasState.length - 1) {
        let indexToBeInserted = tempConfig.currentStateIndex + 1
        tempConfig.canvasState[indexToBeInserted] = canvasAsJson

        let numberOfElementsToRetain = indexToBeInserted + 1
        tempConfig.canvasState = tempConfig.canvasState.splice(
          0,
          numberOfElementsToRetain,
        )
      } else {
        tempConfig.canvasState.push(canvasAsJson)
      }

      tempConfig.currentStateIndex = tempConfig.canvasState.length - 1

      if (
        tempConfig.currentStateIndex === tempConfig.canvasState.length - 1 &&
        tempConfig.currentStateIndex !== -1
      ) {
        tempConfig.redoButton = 'disabled'
      }
    }
    this.props.setCanvasConfig(tempConfig)
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.props.canvas,
      })
    })
    const { width, height } = this.props
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.props.canvas && children}
      </Fragment>
    )
  }
}

const setCanvas = canvas => {
  return {
    type: 'SET_CANVAS',
    canvas: canvas,
  }
}

const setCanvasConfig = _config => {
  return {
    type: 'SET_CONFIG',
    _config,
  }
}

const setDisableLoad = () => {
  return {
    type: 'DISABLE_DESIGN_LOAD',
  }
}

const setCanvasGrid = grid => {
  return {
    type: 'SET_CANVAS_GRID',
    grid: grid,
  }
}

const setSelectedMaterialColor = color => {
  return {
    type: 'SET_SELECTEED_MATERIAL_COLOR',
    color: color,
  }
}

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
    _config: state._config,
    load_design: state.load_design,
    saved_id: state.saved_id,
    wrestling_config: state.wrestling_config,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCanvasConfig,
      setDisableLoad,
      setCanvasGrid,
      setCanvas,
      setSelectedMaterialColor,
    },
    dispatch,
  )
}

const DesignCanvasState = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesignCanvas)

export default DesignCanvasState
