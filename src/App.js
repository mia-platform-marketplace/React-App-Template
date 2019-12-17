import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl'

import logo from './logo.svg'
import './App.css'
import HelloWorld from './containers/HelloWorld'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img alt='logo' className='App-logo' src={logo} />
          <p>
            {'Edit'} <code>{'src/App.js'}</code> {'and save to reload.'}
          </p>
          <HelloWorld />
          <FormattedMessage id={'test'} />
          <a
            className='App-link'
            href='https://reactjs.org'
            rel='noopener noreferrer'
            target='_blank'
          >
            {'Learn React'}
          </a>
        </header>
      </div>
    )
  }
}

export default App
