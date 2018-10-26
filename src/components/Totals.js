import React, { Component } from "react";

import '../styles/components/totals/totals.scss';

class Totals extends Component {
  handleTotalAddresses()  {
    const totalAddresses = this.props.addresses.length;
    
    return (totalAddresses === 0 ? '' : totalAddresses);
  }
  
  handleTotalCrypto() {
    let totalCrypto = 0;

    this.props.addresses.map(addressObject => {
      if (addressObject.cryptoAmount !== '') {
        totalCrypto += addressObject.cryptoAmount;
      }
      return 0;
    });
    return (
      this.props.checkBalanceState === 'checked' ? totalCrypto : ''
    );
  }
  
  handleTotalFiat() {
    let totalFiat = 0;

    this.props.addresses.map(addressObject => {
      if (addressObject.fiatAmount !== '') {
        totalFiat += addressObject.fiatAmount;
      }
      return 0;
    });
    
    return (
      this.props.checkBalanceState === 'checked' ? '$' + totalFiat.toFixed(2) : ''
    );
  }
    
  render(props) {
    return(
      <thead>
        <tr>
          <th>Addresses: {this.handleTotalAddresses()}</th>
          <th>{this.props.cryptoSym.toUpperCase()}: {this.handleTotalCrypto()}</th>
          <th>USD: {this.handleTotalFiat()}</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }
}

export default Totals;