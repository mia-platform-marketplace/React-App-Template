/*
 * Copyright © 2019-present Mia s.r.l.
 * All rights reserved
 */

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'
import {NODE_ENV} from './config'

const middlewares = [thunkMiddleware]

if (NODE_ENV === 'development') {
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  })
  middlewares.push(logger)
}

const rootReducer = combineReducers(reducers)

const persistConfig = {
  key: 'mia_template_service_name_placeholder',
  storage,
  whitelist: []
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  if (NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(persistedReducer)
      })
    }
  }

  return store
}

export const store = configureStore()

export const persistor = persistStore(store)
