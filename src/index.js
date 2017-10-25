import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch } from 'react-router';
import reducers from './reducers' // Or wherever you keep your reducers
import Reader from './containers/reader-container';
import NotFound from './components/not-found';
import './index.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, thunk)
)

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

const AppContainer = ({ location }) => (
  <ConnectedSwitch>
    <Route exact path="/" component={NotFound} />
    <Route path="/reader/:id" component={Reader} />
    <Route path="*" component={NotFound} />
  </ConnectedSwitch>
);

const App = connect(state => ({
  location: state.location,
}))(AppContainer)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
