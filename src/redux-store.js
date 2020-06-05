/*
 * Copyright 2019 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
