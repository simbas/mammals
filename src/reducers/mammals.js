/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = [];

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = state.slice(0);

  switch(action.type) {

    case 'LOAD': {
      nextState = action.payload;
      nextState.sort(function(a, b) {
        return b.sleepTotal - a.sleepTotal;
      });
      return nextState;
    } break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
