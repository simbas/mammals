import {LOAD} from './../const';
import {createAction} from 'redux-actions';

module.exports = createAction(LOAD, async function () {
  let response = await fetch(`mammals.json`);
  let mammals = await response.json();
  return mammals;
});
