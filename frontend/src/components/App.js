import React, { Component } from 'react';
import Header from './Header';
import Main from './main';
import '../utils/App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
        products : []
      }
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
