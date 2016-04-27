import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MammalComponent from '../components/MammalComponent';

function mapStateToProps(state) {
  let {params} = this.props;
  let mammal = state.mammals.find((mammal) => mammal.name === params.name);
  const props = {mammal: mammal};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(MammalComponent);
