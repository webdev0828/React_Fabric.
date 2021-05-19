import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class MatsToolbar extends React.Component {
  setConfigWrestling = e => {
    let width = 0
    let height = 0
    let fileName = ''
    let { value } = e.target
    if (value === 'Oct30') {
      width = 15
      height = 15
      fileName = 'oct30.png'
    } else if (value === 'Oct24') {
      width = 12
      height = 12
      fileName = 'oct24.png'
    } else {
      let res = value.split(' ')
      width = res[1] / 2
      height = res[3] / 2
      fileName = `${width * 2}x${height * 2}.png`
    }

    const isNewMaterial = true
    this.props.setWrestlingConfig(width, height, isNewMaterial, fileName)
    this.deleteAllComponents()
  }

  setWrestlingConfig = (width, height, flag, file) => {
    this.props.setWrestlingConfig(width, height, flag, file)
    this.deleteAllComponents()
  }

  deleteAllComponents = () => {
    const curvedTexts = this.props.canvas.getObjects('curvedText')
    curvedTexts.map(text => this.props.canvas.remove(text))
    const images = this.props.canvas.getObjects('image')
    images.map(image => this.props.canvas.remove(image))
    const groups = this.props.canvas.getObjects('group')
    groups.map(group => this.props.canvas.remove(group))
    const circles = this.props.canvas.getObjects('circle')
    circles.map(circle => this.props.canvas.remove(circle))
  }

  render() {
    return (
      <>
        <div className="adddiv">
          <h2>Select Mats</h2>
        </div>
        <div className="templatesmain mat-lft-blk-menu" style={{ height: 550 }}>
          <div className="row ">
            <div className="col-md-12">
              <form className="form-horizontal">
                <span className="glyphicon glyphicon-search form-control-feedback serch-icon-left"></span>
                <input
                  type="text"
                  className="form-control seacrh-field-mat"
                  id=""
                  placeholder="Seacrh in Dollamur Store Front"
                />
              </form>
            </div>
            <div className="col-md-12 mt-15">
              <div className="form-group">
                <select
                  className="form-control slct-font-fam choose-your-size-drop"
                  onChange={this.setConfigWrestling}
                  defaultValue="Mat 42 x 42"
                >
                  <option>Mat 42 x 42</option>
                  <option>Mat 42 x 40</option>
                  <option>Mat 42 x 38</option>
                  <option>Mat 40 x 40</option>
                  <option>Mat 36 x 36</option>
                  <option>Mat 30 x 30</option>
                  <option>Mat 12 x 12</option>
                  <option>Oct30</option>
                  <option>Oct24</option>
                </select>
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/42x42.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(21, 21, true, '42x42.png')
                  }
                />
                <span>42x42</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/42x40.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(21, 20, true, '42x40.png')
                  }
                />
                <span>42x40</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/42x38.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(21, 19, true, '42x38.png')
                  }
                />
                <span>42x38</span>
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/40x40.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(20, 20, true, '40x40.png')
                  }
                />
                <span>40x40</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/36x36.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(18, 18, true, '36x36.png')
                  }
                />
                <span>36x36</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/30x30.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(15, 15, true, '30x30.png')
                  }
                />
                <span>30x30</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/12x12.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(6, 6, true, '12x12.png')
                  }
                />
                <span>12x12</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/oct30.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(15, 15, true, 'oct30.png')
                  }
                />
                <span>Oct30</span>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="temrows mat-lft-repeat-blk">
                <img
                  src={require('./../../../../assets/img/oct24.png')}
                  alt="Template"
                  className="img-responsive"
                  onClick={() =>
                    this.setWrestlingConfig(12, 12, true, 'oct24.png')
                  }
                />
                <span>Oct24</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const setWrestlingConfig = (width, height, isNewMaterial, file) => {
  const data = {
    width: width,
    height: height,
    length_unit: 'METER',
    isNewMaterial: isNewMaterial,
    file: file,
  }
  return {
    type: 'SET_WRESTLING_CONFIG',
    _config: data,
  }
}

const mapStateToProps = state => {
  return {
    canvas: state.canvas,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setWrestlingConfig }, dispatch)
}

const MatsToolbarConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatsToolbar)

class MatsToolSidebar extends React.Component {
  closeNav = () => {
    document.getElementById('mySidenav1').style.width = '0'
  }

  render() {
    return (
      <>
        <div id="mats" className="h100 second-menu fordeskview">
          <MatsToolbarConnect />
        </div>
        <div
          className="text-center h100 pad0 mtopneg sidenav1 formobview wo"
          id="mySidenav1"
        >
          <a
            style={{ color: '#fff' }}
            href="#"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <MatsToolbarConnect />
        </div>
      </>
    )
  }
}

export default MatsToolSidebar
