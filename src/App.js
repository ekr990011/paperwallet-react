import React, { Component } from 'react';
import Header from './components/Header';
import AddressList from './components/AddressList';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <AddressList/>
      </div>
    );
  }
}

export default App;
