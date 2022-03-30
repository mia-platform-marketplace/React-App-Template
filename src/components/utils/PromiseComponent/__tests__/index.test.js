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
import {FormattedMessage, IntlProvider} from 'react-intl'
import {waitFor} from '@testing-library/react'

import {renderComponent} from '../../../../utilsTests'
import PromiseComponent from '..'

const english = {learn: 'Learn React'}

describe('PromiseComponent', () => {
  test('renders children passing data if english data is defined', async () => {
    const promiseFunction = jest.fn().mockResolvedValueOnce(english)
    const element = renderComponent(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => (
          <IntlProvider locale={'en'} messages={data}>
            <FormattedMessage id='learn' />
          </IntlProvider>
        )}
      </PromiseComponent>
    )
    await waitFor(
      () => expect(element.getByText('Learn React')).toBeInTheDocument()
    )
  })

  test('renders div with error when usePromise returns data undefined and isError true', async () => {
    const promiseFunction = jest.fn().mockRejectedValueOnce({isError: true})
    const children = jest.fn()
    const element = renderComponent(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => children(data)}
      </PromiseComponent>
    )

    await waitFor(
      () => expect(element.getByText('Error')).toBeInTheDocument()
    )
  })

  test('renders div with loading message when usePromise returns data undefined and isError false', async () => {
    const promiseFunction = jest.fn().mockResolvedValue(undefined)
    const children = jest.fn()
    const element = renderComponent(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => children(data)}
      </PromiseComponent>
    )

    await waitFor(
      () => expect(element.getByText('Loading...')).toBeInTheDocument()
    )
  })
})
