import React, { Component } from "react";
import Clipboard from 'react-clipboard-polyfill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QRCode from 'qrcode.react';

import "../styles/components/header/header.scss";
import CryptoDropdown from "./CryptoDropdown";
import Ad from "./Ad";

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      btc: "1337ipJbP7U9mi9cdLngL3g5Napum7tWzM",
      eth: "0x94483b123b422d2Ab61fC459118667513956144E",
      bch: "1GDLQvcZY8TS56gf6X8Hm94B8wRkbtV438",
      ltc: "LWcXUB6ny88tK49TK1V6KprE5oDcJ1zJhx",
      ppc: "PMWKyz4Sr8nKZnjABsWKnxJHCnjKo4garm",
      doge: "DND5TbT834xsjBre1c6pREJYWMDWKAL1rc",
      nmc: "NKX2XRAnucmc8RBTV9oZo8kgx7NP6K52JV",
      etc: "Ethereum Classic Paper Wallet Checker!",
      vtc: "VhuhgKpVwgqyuNCsJpEjcWxxKyP9rm9Aod",
      dash: "XckPoTubxQ8PbY9VAYCnSZarpsq6BFNUHA",
      btg: "GMbBJi6x6osdKnCnQUZqUWgD3fGztzik1h",
      neo: "Neo Paper Wallet Checker!",
      gas: "Neo Gas Paper Wallet Checker!",
      qtum: "Qtum Paper Wallet Checker!",
      kmd: "Komodo Paper Wallet Checker!",
      btcz: "Bitcoinz Paper Wallet Checker!",
      zen: "Zen Paper Wallet Checker!",
      zec: "t1d29PNHtTJHHE4jMeLJFrmRcHJNhyYxZZC",
      zcl: "ZClassic Paper Wallet Checker!",
      dcr: "Decred Paper Wallet Checker!",
      dgb: "DKkftwDYUQpMZCcDmcgtbLnCk5sf1qV9Hi"
    }
    
    
  }
  
  render(){
    const cryptoSym = this.props.cryptoSym;
    const cryptoFiatRate = (
      <h3 className="text-center" id="fiat-current-price">
        Current {this.props.cryptoSym.toUpperCase()} / USD : ${this.props.fiatPrice.toFixed(2)}
      </h3>
    );

    return (
        <div className="header row">
          <div className="qrcode col-2">
            <QRCode value={this.state[cryptoSym]} renderAs={"svg"} className={"qrcode-canvas"} />
          </div>
          <div className="col-10">
            <h1 className="donation-address">
              <Clipboard text={this.state[cryptoSym]}>
                {this.state[cryptoSym]}
                {" "}
                <FontAwesomeIcon icon="copy" className="copy-icon" />
              </Clipboard>
            </h1>
            <div className="col-10 text-center">
              <h3 className="slogan">Your Crypto Paper Wallet Checker ! 
                {" "}
                <CryptoDropdown handleCryptoSymId={this.props.handleCryptoSymId}/>
              </h3>
              {this.props.checkBalanceState === 'checked' ? cryptoFiatRate : ''}
            </div>
            <Ad />
          </div>
        </div>
    );
  }
}


export default Header;