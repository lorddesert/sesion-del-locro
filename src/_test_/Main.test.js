/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'

 import * as React from 'react'
 import { render } from '@testing-library/react'
 import Main from'../components/Main/Main'
 
   test('Rendering component Main: ', () => {
     render(<Main />)
   })