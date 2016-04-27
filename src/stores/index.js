const redux = require('redux');
const reducers = require('../reducers');
import promiseMiddleware from 'redux-promise';

module.exports = function(initialState) {
  const store = redux.createStore(reducers, initialState, redux.applyMiddleware(promiseMiddleware))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
