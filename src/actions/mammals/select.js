import {SELECT} from './../const';
import {createAction} from 'redux-actions';

module.exports = createAction(SELECT, function (mammal) {
  return mammal;
});
