import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import 'bootstrap/dist/css/bootstrap.css';

import App from './routers/App'
import rootReducer from './reducers'

import './Styles/index.css'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)