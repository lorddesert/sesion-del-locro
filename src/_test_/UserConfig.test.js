/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'

 import * as React from 'react'
 import { render } from '@testing-library/react'
 import UserConfig from'../components/UserConfig/UserConfig'
 
 const $ = document.querySelector
   test('Rendering component Main: ', () => {
     render(<UserConfig />)

     const editBtn = $("#editBtn")

     const changeImgBtn = $(".changeImgBtn")

     expect(editBtn).toBeTruthy()

     editBtn.click()

     expect(changeImgBtn).toBeTruthy()
   })