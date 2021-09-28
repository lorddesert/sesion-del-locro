import React from 'react';
import { GlobalContextProvider } from '../../context/GlobalContext'

import './App.scss';
// reset and normalize css
import './normalize.scss';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const App = () => {
  return (<GlobalContextProvider>
    <div className='App'>
      <div className='App-container'>
        {/* <Header /> */}
        <Main />
        {/* <Footer /> */}
      </div>
    </div>
  </GlobalContextProvider>
  )
}

export default App;