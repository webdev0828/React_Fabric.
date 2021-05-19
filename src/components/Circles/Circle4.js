import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Circle4 extends React.Component {
  componentDidMount() {
    const config = this.props.wrestling_config
    const width = 400
    const height = (400 / config.width) * config.height
    const circle_type = this.props.circle_type
    let type = ''
    let outer_radius = 0
    let inner_radius = 0
    if (config.file === 'oct24.png' || config.file === 'oct30.png') {
      let res = circle_type.split('-')
      type = res[1]
    } else {
      type = circle_type
    }

    switch (config.file) {
      case '42x42.png':
      case '42x40.png':
      case '42x38.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 42) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 42) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 42) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
        }
        break

      case '40x40.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 40) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 40) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 40) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 40) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 40) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 40) * 10 - 10) / 2)
            break
        }
        break

      case '36x36.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 36) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 36) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 36) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 36) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 36) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 36) * 10 - 10) / 2)
            break
        }
        break

      case 'oct30.png':
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 42) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 42) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 42) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
        }
        break

      default:
        switch (type) {
          case '0':
            outer_radius = Math.round(((400 / 42) * 32 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          case '1':
            outer_radius = Math.round(((400 / 42) * 30 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
          default:
            outer_radius = Math.round(((400 / 42) * 28 - 10) / 2)
            inner_radius = Math.round(((400 / 42) * 10 - 10) / 2)
            break
        }
        break
    }
    const outer_circle = new window.fabric.Circle({
      radius: outer_radius,
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      top: height / 2 - outer_radius - 5,
      left: width / 2 - outer_radius - 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    const inner_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5,
      left: width / 2 - inner_radius - 5,
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    let rect_left = width / 2 - 5
    let rect_top = height / 2 - 5

    const topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 7.5],
      {
        fill: '#521',
        stroke: '#521',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bottomLine = new window.fabric.Line(
      [rect_left - 15, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: '#200',
        stroke: '#200',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const group = new window.fabric.Group([
      topLine,
      leftLine,
      bottomLine,
      rightLine,
    ])

    const tl_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5 - (outer_radius - inner_radius * 0.7),
      left: width / 2 - inner_radius - 5 - (outer_radius - inner_radius * 0.7),
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left =
      width / 2 -
      inner_radius -
      5 -
      (outer_radius - inner_radius * 0.7) +
      inner_radius
    rect_top =
      height / 2 -
      inner_radius -
      5 -
      (outer_radius - inner_radius * 0.7) +
      inner_radius

    const tl_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tl_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tl_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tl_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tl_group = new window.fabric.Group([
      tl_topLine,
      tl_leftLine,
      tl_bottomLine,
      tl_rightLine,
    ])

    const tm_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5 - (outer_radius - inner_radius * 0.6),
      left: width / 2 - inner_radius - 5,
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left = width / 2 - inner_radius - 5 + inner_radius
    rect_top =
      height / 2 -
      inner_radius -
      5 -
      (outer_radius - inner_radius * 0.6) +
      inner_radius

    const tm_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tm_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tm_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tm_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tm_group = new window.fabric.Group([
      tm_topLine,
      tm_leftLine,
      tm_bottomLine,
      tm_rightLine,
    ])

    const tr_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5 - (outer_radius - inner_radius * 0.7),
      left: width / 2 - inner_radius - 5 + (outer_radius - inner_radius * 0.7),
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left =
      width / 2 -
      inner_radius -
      5 +
      (outer_radius - inner_radius * 0.7) +
      inner_radius
    rect_top =
      height / 2 -
      inner_radius -
      5 -
      (outer_radius - inner_radius * 0.7) +
      inner_radius

    const tr_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tr_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tr_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tr_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const tr_group = new window.fabric.Group([
      tr_topLine,
      tr_leftLine,
      tr_bottomLine,
      tr_rightLine,
    ])

    const ml_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5,
      left: width / 2 - inner_radius - 5 - (outer_radius - inner_radius * 0.6),
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left =
      width / 2 -
      inner_radius -
      5 -
      (outer_radius - inner_radius * 0.6) +
      inner_radius
    rect_top = height / 2 - inner_radius - 5 + inner_radius

    const ml_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const ml_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const ml_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const ml_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const ml_group = new window.fabric.Group([
      ml_topLine,
      ml_leftLine,
      ml_bottomLine,
      ml_rightLine,
    ])

    const mr_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5,
      left: width / 2 - inner_radius - 5 + (outer_radius - inner_radius * 0.6),
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left =
      width / 2 -
      inner_radius -
      5 +
      (outer_radius - inner_radius * 0.6) +
      inner_radius
    rect_top = height / 2 - inner_radius - 5 + inner_radius

    const mr_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const mr_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const mr_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const mr_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const mr_group = new window.fabric.Group([
      mr_topLine,
      mr_leftLine,
      mr_bottomLine,
      mr_rightLine,
    ])

    const bl_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5 + (outer_radius - inner_radius * 0.7),
      left: width / 2 - inner_radius - 5 - (outer_radius - inner_radius * 0.7),
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left =
      width / 2 -
      inner_radius -
      5 -
      (outer_radius - inner_radius * 0.7) +
      inner_radius
    rect_top =
      height / 2 -
      inner_radius -
      5 +
      (outer_radius - inner_radius * 0.7) +
      inner_radius

    const bl_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bl_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bl_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bl_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bl_group = new window.fabric.Group([
      bl_topLine,
      bl_leftLine,
      bl_bottomLine,
      bl_rightLine,
    ])

    const bm_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5 + (outer_radius - inner_radius * 0.6),
      left: width / 2 - inner_radius - 5,
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left = width / 2 - inner_radius - 5 + inner_radius
    rect_top =
      height / 2 -
      inner_radius -
      5 +
      (outer_radius - inner_radius * 0.6) +
      inner_radius

    const bm_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bm_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bm_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bm_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const bm_group = new window.fabric.Group([
      bm_topLine,
      bm_leftLine,
      bm_bottomLine,
      bm_rightLine,
    ])

    const br_circle = new window.fabric.Circle({
      radius: inner_radius,
      top: height / 2 - inner_radius - 5 + (outer_radius - inner_radius * 0.7),
      left: width / 2 - inner_radius - 5 + (outer_radius - inner_radius * 0.7),
      fill: 'rgba(0,0,0,0)',
      stroke: 'black',
      strokeWidth: 5,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    })

    rect_left =
      width / 2 -
      inner_radius -
      5 +
      (outer_radius - inner_radius * 0.7) +
      inner_radius
    rect_top =
      height / 2 -
      inner_radius -
      5 +
      (outer_radius - inner_radius * 0.7) +
      inner_radius

    const br_topLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left + 15, rect_top - 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const br_leftLine = new window.fabric.Line(
      [rect_left - 15, rect_top - 7.5, rect_left - 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const br_bottomLine = new window.fabric.Line(
      [rect_left - 12, rect_top + 7.5, rect_left + 15, rect_top + 7.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const br_rightLine = new window.fabric.Line(
      [rect_left + 15, rect_top - 7.5, rect_left + 15, rect_top + 10.5],
      {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
      },
    )

    const br_group = new window.fabric.Group([
      br_topLine,
      br_leftLine,
      br_bottomLine,
      br_rightLine,
    ])

    outer_circle['setControlVisible']('mtr', false)
    inner_circle['setControlVisible']('mtr', false)
    tl_circle['setControlVisible']('mtr', false)
    tr_circle['setControlVisible']('mtr', false)
    bl_circle['setControlVisible']('mtr', false)
    br_circle['setControlVisible']('mtr', false)
    tm_circle['setControlVisible']('mtr', false)
    ml_circle['setControlVisible']('mtr', false)
    mr_circle['setControlVisible']('mtr', false)
    bm_circle['setControlVisible']('mtr', false)
    tr_group['setControlVisible']('mtr', false)
    tl_group['setControlVisible']('mtr', false)
    br_group['setControlVisible']('mtr', false)
    bl_group['setControlVisible']('mtr', false)
    tm_group['setControlVisible']('mtr', false)
    ml_group['setControlVisible']('mtr', false)
    mr_group['setControlVisible']('mtr', false)
    bm_group['setControlVisible']('mtr', false)

    this.props.canvas.add(outer_circle)
    this.props.canvas.add(inner_circle)
    this.props.canvas.add(tl_circle)
    this.props.canvas.add(tr_circle)
    this.props.canvas.add(bl_circle)
    this.props.canvas.add(br_circle)
    this.props.canvas.add(tm_circle)
    this.props.canvas.add(ml_circle)
    this.props.canvas.add(mr_circle)
    this.props.canvas.add(bm_circle)
    this.props.canvas.add(group)
    this.props.canvas.add(tr_group)
    this.props.canvas.add(tl_group)
    this.props.canvas.add(br_group)
    this.props.canvas.add(bl_group)
    this.props.canvas.add(tm_group)
    this.props.canvas.add(ml_group)
    this.props.canvas.add(mr_group)
    this.props.canvas.add(bm_group)
    this.updateCanvasState()
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
    return null
  }
}

const setCanvasConfig = _config => {
  return {
    type: 'SET_CONFIG',
    _config,
  }
}

const mapStateToProps = state => {
  return {
    _config: state._config,
    wrestling_config: state.wrestling_config,
    circle_type: state.circle_type,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCanvasConfig,
    },
    dispatch,
  )
}

const Circle4Connect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Circle4)

export default Circle4Connect
