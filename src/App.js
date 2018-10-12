import React, { Component } from 'react';
import Header from './components/Header';
import AddressList from './components/AddressList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    
    // cryptoId is used in CoinMarketCap api
    this.state = {
      fiatPrice: 0,
      cryptoSym: "btc",
      cryptoId: 1
    };
    
    this.handleFiatPrice = this.handleFiatPrice.bind(this);
    this.handleCryptoSymId = this.handleCryptoSymId.bind(this);
  }
  
  handleCryptoSymId(cryptoSym, cryptoId) {
    this.setState({cryptoSym: cryptoSym, cryptoId: cryptoId});
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
          <Header 
            fiatPrice={this.state.fiatPrice}
            cryptoSym={this.state.cryptoSym}
            handleCryptoSymId={this.handleCryptoSymId}
          />
          <AddressList 
            fiatPrice={this.state.fiatPrice}
            cryptoSym={this.state.cryptoSym}
            cryptoId={this.state.cryptoId}
            handlefiatPrice={this.handleFiatPrice}
          />
        </div>
    );
  }
}

export default App;
