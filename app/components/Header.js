'use strict';

import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div role="banner">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Header;
