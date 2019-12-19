import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img alt='logo' className='App-logo' src={logo} />
          <p>
            <FormattedMessage id={'edit'} />
            <code>{'src/App.js'}</code>
            <FormattedMessage id={'save'} />
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            rel='noopener noreferrer'
            target='_blank'
          >
            <FormattedMessage id={'learn'} />
          </a>
        </header>
      </div>
    )
  }
}

export default App
