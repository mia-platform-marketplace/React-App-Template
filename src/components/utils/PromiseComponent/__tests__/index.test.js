import React from 'react'
import {mount} from 'enzyme'

import PromiseComponent from '..'
import {FormattedMessage, IntlProvider} from 'react-intl'

const italian = {'test': 'Questa è una stringa in italiano'}

const english = {'test': 'This is an english string'}

describe('PromiseComponent', () => {
  it('renders children passing data if italian data is defined', (done) => {
    const promiseFunction = jest.fn().mockResolvedValueOnce(italian)
    const element = mount(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => (
          <IntlProvider locale={'en'} messages={data}>
            <FormattedMessage id='test' />
          </IntlProvider>
        )}
      </PromiseComponent>
    )
    setImmediate(() => {
      element.mount()
      expect(element.find(FormattedMessage).text()).toEqual('Questa è una stringa in italiano')
      done()
    })
  })

  it('renders children passing data if english data is defined', (done) => {
    const promiseFunction = jest.fn().mockResolvedValueOnce(english)
    const element = mount(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => (
          <IntlProvider locale={'en'} messages={data}>
            <FormattedMessage id='test' />
          </IntlProvider>
        )}
      </PromiseComponent>
    )
    setImmediate(() => {
      element.mount()
      expect(element.find(FormattedMessage).text()).toEqual('This is an english string')
      done()
    })
  })

  it('renders div with error when usePromise returns data undefined and isError true', () => {
    const promiseFunction = jest.fn().mockRejectedValueOnce({isError: true})
    const children = jest.fn()
    const element = mount(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => children(data)}
      </PromiseComponent>
    )
    setImmediate(() => {
      expect(element.find('div').text()).toEqual('Error')
      expect(children).toHaveBeenCalledTimes(0)
    })
  })
  it('renders div with Loading... when usePromise returns data undefined and isError false', () => {
    const promiseFunction = jest.fn().mockResolvedValue(undefined)
    const children = jest.fn()
    const element = mount(
      <PromiseComponent promiseFunction={promiseFunction}>
        {data => children(data)}
      </PromiseComponent>
    )
    setImmediate(() => {
      expect(element.find('div').text()).toEqual('Loading...')
      expect(children).toHaveBeenCalledTimes(0)
    })
  })
})
