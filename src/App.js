import React, { Component } from 'react';
import Header from './components/Header';
import AddressList from './components/AddressList';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fiatPrice: 0,
      cryptoSym: "btc"
    };
    
    this.handleFiatPrice = this.handleFiatPrice.bind(this);
  }
  
  handleFiatPrice(price) {
    this.setState(() => {
      return {
        fiatPrice: price
      };
    });
  }
  
  render() {
    return (
      <div className="App">
        <Header/>
        <AddressList fiatPrice={this.handleFiatPrice}/>
      </div>
    );
  }
}

export default App;
