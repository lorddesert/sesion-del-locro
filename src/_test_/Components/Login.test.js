/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Contacts from '../../components/Contacts/Contacts'
import Login from'../../components/Login/Login'
import Chat from'../../components/Chat/Chat'

// test('render the comp.', () => {
//     render(<Contacts />)
//   })

  test('Render login', () => {
    render(<Login />)
  })