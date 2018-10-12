import React, { Component } from "react";
import CryptoDropdown from "./CryptoDropdown";

class Header extends Component {
  
  render(){
    return (
        <div className="todoListMain">
          <div className="header">
            <h1>PaperWallet</h1>
            <CryptoDropdown handleCryptoSymId={this.props.handleCryptoSymId}/>
          </div>
        </div>
    );
  }
}


export default Header;