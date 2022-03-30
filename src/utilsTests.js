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

import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import {MemoryRouter, Route} from 'react-router-dom'

let testStrings = {
  'test.string': 'string test',
  'test.values.string': 'string with values {value}'
}

const timeZoneWithNoOffset = 'America/Danmarkshavn'

export const setTestStrings = (strings) => {
  testStrings = {
    ...testStrings,
    ...strings
  }
}

export const renderComponent = (children, options = {}, language = 'en') => {
  return render(
    <IntlProvider locale={language} messages={testStrings}>
      {children}
    </IntlProvider>,
    options
  )
}

export const renderComponentWithRouter = (children, path = '/', options = {}, language = 'en') => {
  return renderComponent(
    <MemoryRouter initialEntries={[path]}>
      {children}
    </MemoryRouter>,
    options,
    language
  )
}

export function renderContainer (store, children, path = '/', options = {}, language = 'en') {
  return render(
    <Provider store={store}>
      <IntlProvider locale={language} messages={testStrings} timeZone={timeZoneWithNoOffset}>
        <MemoryRouter initialEntries={[path]}>
          {children}
        </MemoryRouter>
      </IntlProvider>
    </Provider>, options
  )
}

export function renderContainerWithRoute (
  store,
  children,
  path = '/',
  matchPath = '/',
  options = {},
  language = 'en'
) {
  return render(
    <Provider store={store}>
      <IntlProvider locale={language} messages={testStrings} timeZone={timeZoneWithNoOffset}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={matchPath}>
            {children}
          </Route>
        </MemoryRouter>
      </IntlProvider>
    </Provider>, options
  )
}
