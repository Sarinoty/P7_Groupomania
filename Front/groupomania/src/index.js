import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { /* applyMiddleware, */ createStore } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import thunk from 'redux-thunk';
import rootReducer from './reducers';
//import { zIndex } from './actions/log.action';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); */

//store.dispatch(zIndex(0));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
)
/* ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
); */