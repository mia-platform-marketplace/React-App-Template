/*
 * Copyright © 2019-present Mia s.r.l.
 * All rights reserved
 */

import React from 'react'

import {renderComponent} from '../utilsTests'
import App from '../App'

test('renders without crashing', () => {
  const component = renderComponent(<App />)
  expect(component.getByText('Learn React')).toBeInTheDocument()
})
