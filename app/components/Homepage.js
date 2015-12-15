'use strict';

import React, { Component } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class Homepage extends Component {
  render() {
    return (
      <div id="main-wrap">
        <Header title="Hello" />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default Homepage;
