import React from 'react'
import { Container } from 'shards-react'
import Toolbar from '../components/Toolbar/Text-Edit-Toolbar'
import 'fabric-webpack'
import DesignCanvas from '../components/DesignCanvas'
import { connect } from 'react-redux'
import Text from '../components/Text'
import { bindActionCreators } from 'redux'
import OptionSettingDialogue from '../components/layout/wrestling_mat_designer/Option_Settting_Dialogue'

class Dashboard extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    if (id !== undefined) {
      this.props.setSaveDesignID(id)
    }
  }
  render() {
    const components = this.props.components
    const wrestling_config = this.props.wrestling_config
    if (!wrestling_config.option_setting) return <OptionSettingDialogue />
    return (
      <Container fluid className="main-content-container px-4">
        <DesignCanvas>
          <Toolbar />
          {components.map((component, idx) => (
            <Text key={idx} />
          ))}
        </DesignCanvas>
      </Container>
    )
  }
}

const setSaveDesignID = id => {
  return {
    type: 'SET_SAVED_ID',
    id: id,
  }
}

const mapStateToProps = state => {
  return {
    components: [...state.components],
    wrestling_config: state.wrestling_config,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setSaveDesignID }, dispatch)
}

const Wrestling_Designer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export default Wrestling_Designer
