import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import App from './App';

import * as serviceWorker from './serviceWorker';

import './index.css';

import authReducer from "./store/reducers/auth-reducer";
import productReducer from "./store/reducers/product-reducer";

/**
 * Persist Configurations.
 */
const persistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['auth']
};

/**
 * Root reduces object.
 */
const rootReducers = combineReducers({
  auth: authReducer,
  product: productReducer
});

/**
 * Persist reducer.
 */
const pReducer = persistReducer(persistConfig, rootReducers);

/**
 * Redux store object.
 */
const store = createStore(pReducer, applyMiddleware(thunk));

/**
 * Persist the store.
 */
persistStore(store);

/**
 * App elements.
 */
const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root')
);

serviceWorker.unregister();
