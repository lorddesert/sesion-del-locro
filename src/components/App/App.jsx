import React, { Component } from 'react';

import './App.scss';
// reset and normalize css
import './normalize.scss';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-container'>
          {/* <Header /> */}
          <Main/>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default App;