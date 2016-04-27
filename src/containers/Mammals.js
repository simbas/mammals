import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MammalsComponent from '../components/MammalsComponent';
import load from '../actions/mammals/load';

function mapStateToProps(state) {
  const props = {mammals: state.mammals};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {load: load};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(MammalsComponent);
