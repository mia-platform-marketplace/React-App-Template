import React from 'react'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import {mount, shallow} from 'enzyme'

import strings from './strings'

const testStrings = {
  ...strings['en'],
  'test.string': 'string test',
  'test.values.string': 'string with values {value}'
}

const intlProvider = new IntlProvider({locale: 'en', messages: testStrings}, {})
const {intl} = intlProvider.state

export function mountWrapperComponent (children) {
  return mount(
    <IntlProvider locale={'en'} messages={testStrings}>
      {children}
    </IntlProvider>
  )
}

export function mountWrapperContainer (store, initialEntries, children) {
  return mount(
    <Provider store={store}>
      <IntlProvider locale={'en'} messages={testStrings}>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  )
}

export function shallowWithIntl (node, context) {
  return shallow(React.cloneElement(node, {intl}), {context: {intl, ...context}})
}
