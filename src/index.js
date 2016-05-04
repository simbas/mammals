import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import Mammals from './containers/Mammals';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={Mammals}>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('app')
);
