/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import * as React from 'react'
import { render } from '@testing-library/react'
// import renderer from 'react-test-renderer';

import Contacts from'../components/Contacts/Contacts'

  // test('Render component: ', () => {
  //   render(<Contacts />)
  // })

test('Contacts conditional fallback rendering is OK: ', () => {
  const {debug} = render(<Contacts />)
  // className="chat-room"
  // const flag = document.querySelector('#flag')
  
  // expect(flag).toBeTruthy()
  // debug()
})
