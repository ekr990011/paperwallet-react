import React, { Component } from "react";

class Totals extends Component {
  handleTotalAddresses()  {
    const totalAddresses = this.props.addresses.length;
    
    return totalAddresses;
  }
  
  handleTotalCrypto() {
    let totalCrypto = 0;

    this.props.addresses.map(addressObject => {
      if (addressObject.cryptoAmount !== '') {
        totalCrypto += addressObject.cryptoAmount;
      }
      return 0;
    });
    
    return totalCrypto;
  }
  
  handleTotalFiat() {
    let totalFiat = 0;

    this.props.addresses.map(addressObject => {
      if (addressObject.fiatAmount !== '') {
        totalFiat += addressObject.fiatAmount;
      }
      return 0;
    });
    
    return totalFiat;
  }
    
  render(props) {
    return(
      <div>
        {this.handleTotalAddresses()}
        <br />
        {this.handleTotalCrypto()}
        <br />
        {this.handleTotalFiat()}
      </div>
    );
  }
}

export default Totals;