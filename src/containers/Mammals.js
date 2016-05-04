import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MammalsComponent from '../components/MammalsComponent';
import load from '../actions/mammals/load';
import generate from '../actions/mammals/generate';

function mapStateToProps(state) {
  const props = {quizz: state.quizz};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {load: load, generate: generate};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(MammalsComponent);
