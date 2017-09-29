import React, { Component } from 'react';
import Header from './Header';
import Main from './main';
// import '../utils/App.css';
import editorStyle from '../utils/editorStyles.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
        products : []
      }
  }

  render() {
    return (
      <div style={editorStyle}>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
