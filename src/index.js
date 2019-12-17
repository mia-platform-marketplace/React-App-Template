import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {IntlProvider} from 'react-intl'

import PromiseComponent from './components/utils/PromiseComponent'
import {store, persistor} from './redux-store'
import App from './App'
import * as serviceWorker from './serviceWorker'
import messages from './strings'

import './index.css'

const navigatorLanguage = navigator.language.substring(0, 2)
const language = messages[navigatorLanguage] ? navigatorLanguage : 'en'

const rootComponent = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PromiseComponent promiseFunction={messages[language]}>
        {strings => (
          <IntlProvider locale={language} messages={strings}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <App />
            </BrowserRouter>
          </IntlProvider>
        )}
      </PromiseComponent>
    </PersistGate>
  </Provider>
)

ReactDOM.render(rootComponent, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
