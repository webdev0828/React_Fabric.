import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class CirclesListBox extends React.Component {
  handleChange = e => {
    this.props.setCircleType(e.target.value)
  }

  render() {
    const config = this.props.wrestling_config
    const filename = config.file
    switch (filename) {
      case '42x42.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="42 x 42 Mat">
                <option value="0">32ft & 10ft Circles - 42x42</option>
                <option value="1">30ft & 10ft Circles - 42x42</option>
                <option value="2">28ft & 10ft Circles - 42x42</option>
              </optgroup>
            </select>
          </div>
        )
      case '42x40.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="42 x 40 Mat">
                <option value="1">30ft & 10ft Circles - 42x40</option>
                <option value="2">28ft & 10ft Circles - 42x40</option>
              </optgroup>
            </select>
          </div>
        )
      case '42x38.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="42 x 38 Mat">
                <option value="1">30ft & 10ft Circles - 42x38</option>
                <option value="2">28ft & 10ft Circles - 42x38</option>
              </optgroup>
            </select>
          </div>
        )
      case '40x40.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="40 x 40 Mat">
                <option value="1">30ft & 10ft Circles - 40x40</option>
                <option value="2">28ft & 10ft Circles - 40x40</option>
              </optgroup>
            </select>
          </div>
        )
      case '36x36.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="36 x 36 Mat">
                <option value="2">28ft & 10ft Circles - 36x36</option>
              </optgroup>
            </select>
          </div>
        )

      case '30x30.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="30 x 30 Mat">
                <option value="2">28ft & 10ft Circles - 30x30</option>
              </optgroup>
            </select>
          </div>
        )

      case '12x12.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="12m x 12m Mat">
                <option value="5-0">UWW Circles - 12mx12m</option>
              </optgroup>
            </select>
          </div>
        )

      case 'oct30.png':
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="42 x 42 Mat">
                <option value="0-0">32ft & 10ft Circles - 42x42</option>
                <option value="0-1">30ft & 10ft Circles - 42x42</option>
                <option value="0-2">28ft & 10ft Circles - 42x42</option>
              </optgroup>
              <optgroup label="42 x 40 Mat">
                <option value="1-1">30ft & 10ft Circles - 42x40</option>
                <option value="1-2">28ft & 10ft Circles - 42x40</option>
              </optgroup>
              <optgroup label="42 x 38 Mat">
                <option value="2-1">30ft & 10ft Circles - 42x38</option>
                <option value="2-2">28ft & 10ft Circles - 42x38</option>
              </optgroup>
              <optgroup label="40 x 40 Mat">
                <option value="3-1">30ft & 10ft Circles - 40x40</option>
                <option value="3-2">28ft & 10ft Circles - 40x40</option>
              </optgroup>
              <optgroup label="36 x 36 Mat">
                <option value="4-2">28ft & 10ft Circles - 36x36</option>
              </optgroup>
              <optgroup label="12m x 12m Mat">
                <option value="5-0">UWW Circles - 12mx12m</option>
              </optgroup>
            </select>
          </div>
        )

      default:
        return (
          <div className="form-group">
            <select
              className="form-control slct-font-fam choose-your-size-drop"
              onChange={this.handleChange}
            >
              <optgroup label="42 x 42 Mat">
                <option value="0-0">32ft & 10ft Circles - 42x42</option>
                <option value="0-1">30ft & 10ft Circles - 42x42</option>
                <option value="0-2">28ft & 10ft Circles - 42x42</option>
              </optgroup>
              <optgroup label="42 x 40 Mat">
                <option value="1-1">30ft & 10ft Circles - 42x40</option>
                <option value="1-2">28ft & 10ft Circles - 42x40</option>
              </optgroup>
              <optgroup label="42 x 38 Mat">
                <option value="2-1">30ft & 10ft Circles - 42x38</option>
                <option value="2-2">28ft & 10ft Circles - 42x38</option>
              </optgroup>
              <optgroup label="40 x 40 Mat">
                <option value="3-1">30ft & 10ft Circles - 40x40</option>
                <option value="3-2">28ft & 10ft Circles - 40x40</option>
              </optgroup>
              <optgroup label="36 x 36 Mat">
                <option value="4-2">28ft & 10ft Circles - 36x36</option>
              </optgroup>
            </select>
          </div>
        )
    }
  }
}

const setNewRectConfig = data => {
  return {
    type: 'NEW_RECT_CONFIG',
    data: data,
  }
}

const setDragRect = drag_new_rect => {
  return {
    type: 'DRAG_NEW_RECT',
    drag_new_rect: drag_new_rect,
  }
}

const setComponentType = type => {
  return {
    type: 'SET_COMPONENT_TYPE',
    component_type: type,
  }
}

const setCircleType = id => {
  return {
    type: 'SET_SELECTED_CIRCLE_TYPE',
    id: id,
  }
}

const mapStateToProps = state => {
  return {
    wrestling_config: state.wrestling_config,
    circle_type: state.circle_type,
    circles_mat_info: state.circles_mat_info,
    oct_mat_info: state.oct_mat_info,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setNewRectConfig, setDragRect, setComponentType, setCircleType },
    dispatch,
  )
}

const CirclesListBoxConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CirclesListBox)

class CircleToolbar extends React.Component {
  addCircle = type => {
    switch (type) {
      case 1:
        this.props.setComponentType('Circle1')
        break
      case 2:
        this.props.setComponentType('Circle2')
        break
      case 3:
        this.props.setComponentType('Circle3')
        break
      case 4:
        this.props.setComponentType('Circle4')
        break
      case 5:
        this.props.setComponentType('Circle5')
        break
      case 6:
        this.props.setComponentType('Circle6')
        break
      case 7:
        this.props.setComponentType('Circle7')
        break
      default:
        this.props.setComponentType('Circle8')
        break
    }
  }

  render() {
    const config = this.props.wrestling_config
    const circle_type = this.props.circle_type
    let radius = 0
    let option = null
    let uww_option = false
    if (config.file === 'oct24.png' || config.file === 'oct30.png') {
      let res = circle_type.split('-')
      radius = res[1]
      option = this.props.oct_mat_info[res[0]][res[1]]
      if (res[0] === '5') uww_option = true
    } else if (config.file === '12x12.png') {
      option = [0, 0, 0, 0]
      uww_option = true
    } else {
      radius = circle_type
      switch (config.file) {
        case '42x42.png':
          option = this.props.circles_mat_info[0][radius]
          break
        case '42x40.png':
          option = this.props.circles_mat_info[1][radius]
          break
        case '42x38.png':
          option = this.props.circles_mat_info[2][radius]
          break
        case '40x40.png':
          option = this.props.circles_mat_info[3][radius]
          break
        case '30x30.png':
          option = this.props.circles_mat_info[5][radius]
          break
        default:
          option = this.props.circles_mat_info[4][radius]
          break
      }
    }

    switch (radius) {
      case '0':
        radius = 32
        break
      case '1':
        radius = 30
        break
      default:
        radius = 28
        break
    }

    return (
      <>
        <div className="adddiv">
          <h2>Select Circle</h2>
        </div>
        <div className="templatesmain mat-lft-blk-menu">
          <div className="row ">
            <div className="col-md-12">
              <form className="form-horizontal">
                <span className="glyphicon glyphicon-search form-control-feedback serch-icon-left"></span>
                <input
                  type="text"
                  className="form-control seacrh-field-mat"
                  id=""
                  placeholder="Seacrh Design"
                />
              </form>
            </div>
            <div className="col-md-12 mt-15">
              <CirclesListBoxConnect />
            </div>
            {option[0] === 1 ? (
              <div className="col-md-6 col-sm-6">
                <div className="temrows mat-lft-repeat-blk cicle-span-wd">
                  <img
                    src={require('./../../../../assets/img/circle1.jpg')}
                    alt="Template"
                    className="img-responsive"
                    onClick={() => this.addCircle(1)}
                  />
                  <span>{radius}-10 Fill</span>
                </div>
              </div>
            ) : (
              <div />
            )}
            {option[1] === 1 ? (
              <div className="col-md-6 col-sm-6">
                <div className="temrows mat-lft-repeat-blk cicle-span-wd">
                  <img
                    src={require('./../../../../assets/img/circle2.jpg')}
                    alt="Template"
                    className="img-responsive"
                    onClick={() => this.addCircle(2)}
                  />
                  <span>{radius}-10 No Fill</span>
                </div>
              </div>
            ) : (
              <div />
            )}
            {option[2] === 1 ? (
              <div className="col-md-6 col-sm-6">
                <div className="temrows mat-lft-repeat-blk cicle-span-wd">
                  <img
                    src={require('./../../../../assets/img/circle3.jpg')}
                    alt="Template"
                    className="img-responsive"
                    onClick={() => this.addCircle(3)}
                  />
                  <span>{radius}-10 (4-10ft)</span>
                </div>
              </div>
            ) : (
              <div />
            )}
            {option[3] === 1 ? (
              <div className="col-md-6 col-sm-6">
                <div className="temrows mat-lft-repeat-blk cicle-span-wd">
                  <img
                    src={require('./../../../../assets/img/circle4.jpg')}
                    alt="Template"
                    className="img-responsive"
                    onClick={() => this.addCircle(4)}
                  />
                  <span>{radius}-10 (8ft)</span>
                </div>
              </div>
            ) : (
              <div />
            )}
            {uww_option === true ? (
              <div className="col-md-6 col-sm-6">
                <div className="temrows mat-lft-repeat-blk cicle-span-wd">
                  <img
                    src={require('./../../../../assets/img/uww.png')}
                    alt="Template"
                    className="img-responsive"
                    onClick={() => this.addCircle(5)}
                  />
                  <span>UWW Mat</span>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </>
    )
  }
}

const CircleToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CircleToolbar)

class CircleToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById('mySidenav3').style.width = '0'
  }

  render() {
    return (
      <>
        <div
          id="circle"
          className="h100 second-menu fordeskview"
          style={{ display: 'none' }}
        >
          <CircleToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav3 formobview wo"
          id="mySidenav3"
        >
          <a
            style={{ color: '#fff' }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <CircleToolbarConnect />
        </div>
      </>
    )
  }
}

export default CircleToolSidebar
