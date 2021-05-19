import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class OptionSettingDialogue extends React.Component {
  state = {
    width: 0,
    height: 0,
    unit: 'FEET',
  }

  onBuild = () => {
    const width = this.state.width
    const height = this.state.height
    if (width > 0 && height > 0) this.props.setFlexiConfig(this.state)
    else alert('Please select the Width or Height')
  }

  _handleWidthChange = e => {
    let { value } = e.target
    this.setState({
      width: value,
    })
  }

  _handleHeightChange = e => {
    let { value } = e.target
    this.setState({
      height: value,
    })
  }

  _handleUnitChange = e => {
    let { value } = e.target
    if (value === 1) {
      this.setState({
        unit: 'FEET',
      })
    } else {
      this.setState({
        unit: 'METERS',
      })
    }
  }

  render() {
    return (
      <div className="see-instruction int-matbuild default-left">
        <div className="container">
          <div className="innerint default-left text-center">
            <h2>Interactive Mat Builder</h2>
            <p>What kind of mat would you like?</p>

            <div className=" selectboxes default-left">
              <div className="row innerselect_box">
                <div className="col-md-4 col-sm-12 selectcol col_1">
                  <select
                    className="mdb-select md-form colorful-select dropdown-primary"
                    onChange={this._handleWidthChange}
                  >
                    <option value="1">Width</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
                <div className="col-md-4 col-sm-12 selectcol col_2">
                  <select
                    className="mdb-select md-form colorful-select dropdown-primary"
                    onChange={this._handleHeightChange}
                  >
                    <option value="1">Height</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
                <div className="col-md-4 col-sm-12 selectcol col_3">
                  <select
                    className="mdb-select md-form colorful-select dropdown-primary"
                    onChange={this._handleUnitChange}
                  >
                    <option value="1">Feet</option>
                    <option value="2">Meters</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="default-left back-fwd-btns">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="bk">
                  <a href="/">
                    <img
                      src={require('./../../../assets/img/bkarw.png')}
                      alt="Back Arrow"
                    />
                    <span>Back</span>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="fw">
                  <a href="#" onClick={() => this.onBuild()}>
                    <span>Build it</span>
                    <img
                      src={require('./../../../assets/img/fwarw.png')}
                      alt="Forward Arrow"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="default-left entertxt text-center">
                <p>
                  Enter your room size. For odd shaped rooms, put in your best{' '}
                  <br />
                  guess of the area & speak to one of our mat experts for a{' '}
                  <br /> more accurate idea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const setFlexiConfig = config => {
  const _config = {
    width: config.width,
    height: config.height,
    option_setting: true,
    length_unit: config.unit,
  }

  return {
    type: 'SET_FLEXI_CONFIG',
    _config: _config,
  }
}

const mapStateToProps = state => {
  return {
    flexi_config: state.flexi_config,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFlexiConfig }, dispatch)
}

const OptionSettingConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionSettingDialogue)

export default OptionSettingConnect
