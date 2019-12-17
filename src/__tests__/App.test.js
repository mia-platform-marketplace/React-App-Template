import React from 'react'

import {shallowWithIntl} from '../utilsTests'
import App from '../App'

it('renders without crashing', () => {
  const element = shallowWithIntl(<App />)
  expect(element.length).toEqual(1)
})
