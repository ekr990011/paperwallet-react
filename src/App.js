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
    this.handleCryptoSym = this.handleCryptoSym.bind(this);
  }
  
  handleFiatPrice(price) {
    this.setState(() => {
      return {
        fiatPrice: price
      };
    });
  }
  
  handleCryptoSym(cryptoSym) {
    this.setState(() => {
      return {
        cryptoSym: cryptoSym
      };
    });
  }
  
  render() {
    return (
      <div className="App">
        <Header 
          fiatPrice={this.state.fiatPrice}
          cryptoSym={this.state.cryptoSym}
          handleCryptoSym={this.handleCryptoSym}
        />
        <AddressList 
          fiatPrice={this.state.fiatPrice}
          cryptoSym={this.state.cryptoSym}
          handlefiatPrice={this.handleFiatPrice}
        />
      </div>
    );
  }
}

export default App;
