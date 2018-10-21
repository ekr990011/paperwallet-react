import React, { Component } from "react";
import WAValidator from 'wallet-address-validator';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import {CSVLink} from 'react-csv';

import Addresses from './Addresses';
import Totals from './Totals';

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      cryptoSym: this.props.cryptoSym,
      cryptoId: this.props.cryptoId,
      filename: 'PaperWalletChecker'
    };
    
    this.handleFilename = this.handleFilename.bind(this);
    this.handleCsvImport = this.handleCsvImport.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    this.clearAddresses(prevProps);
  }
  
  fiatPriceCheck() {
    axios.get("https://api.coinmarketcap.com/v2/ticker/" + this.props.cryptoId + "/")
      .then(res => {
        const price = res.data.data.quotes.USD.price;
        this.props.handlefiatPrice(price);
      })
  }
  
  cryptoAmountCheck() {
    // Fix this to update instead
    this.setState(() => {
      return {
        addresses: []
      };
    });
    const addresses = this.state.addresses.map(a => a.key);
    
    axios.get("https://multiexplorer.com/api/address_balance/private5?addresses="
              + addresses.toString() + "&currency=" + this.props.cryptoSym)
    .then(res => {
      const data = res.data.balance;
      let i;
      for (i = 0; i < addresses.length; i++) {
          const addressBalance = data[addresses[i]];
          const newAddress = {
            key: addresses[i],
            cryptoAmount: addressBalance,
            fiatAmount: addressBalance * this.props.fiatPrice
          };
          
          this.setState((prevState) => {
            return {
              addresses: prevState.addresses.concat(newAddress)
            };
          });
        }
    })
  }
  
  bitcoinAmountCheck() {
    // Fix this to update instead
    this.setState(() => {
      return {
        addresses: []
      };
    });
    const addresses = this.state.addresses.map(a => a.key);
    
    axios.get("https://blockchain.info/balance?active=" + addresses.toString().replace(/,/g, '|') + "&cors=true")
      .then(res => {
        const data = res.data;
        let i;
        for (i = 0; i < addresses.length; i++) {
          const addressBalance = data[addresses[i]].final_balance / 100000000;
          const newAddress = {
            key: addresses[i],
            cryptoAmount: addressBalance,
            fiatAmount: addressBalance * this.props.fiatPrice
          };
          
          this.setState((prevState) => {
            return {
              addresses: prevState.addresses.concat(newAddress)
            };
          });
        }
      })
  }
  
  checkBalance(event) {
    this.props.cryptoSym === 'btc' ? this.bitcoinAmountCheck() : this.cryptoAmountCheck();
    this.fiatPriceCheck();
    
    event.preventDefault();
  }
  
  handleCsvImport(data) {
    data.map((row) => {
      row.map((col) => {
        const addObject = this.state.addresses;
        const checkDuplicateArray = (addObject.map(a => a.key));
        
        if (WAValidator.validate(col.trim(), this.props.cryptoSym)) {
          if (checkDuplicateArray.includes(col.trim())) {
            alert("you have entered a duplicte address");
          } else {
            let newAddress = {
              key: col.trim(),
              cryptoAmount: '',
              fiatAmount: ''
            };
            
            this.setState((prevState) => {
              return {
                addresses: prevState.addresses.concat(newAddress)
              };
            });
          }
        }
        return null;
      });
      return null;
    });
  }


  addAddress(event) {
      const addObject = this.state.addresses;
      const checkDuplicateArray = (addObject.map(a => a.key));
      const duplicate = checkDuplicateArray.includes(this._inputElement.value);
      
      if (duplicate) {
        alert("you have entered a duplicte address");

      } else if (this._inputElement.value !== ""
                && WAValidator.validate(this._inputElement.value, this.props.cryptoSym))  {
        var newAddress = {
          key: this._inputElement.value,
          cryptoAmount: '',
          fiatAmount: ''
        };

        this.setState((prevState) => {
          return {
            addresses: prevState.addresses.concat(newAddress)
          };
        });
      } else {
        alert("Please enter a valid address");
      }

      this._inputElement.value = "";
      event.preventDefault();
  }
  
  clearAddresses(prevProps) {
    prevProps.cryptoSym !== this.props.cryptoSym && this.setState({addresses: []});
  }

  deleteAddress(key) { 
    var filteredAddresses = this.state.addresses.filter(function (address) {
      console.log(address);
      return (address.key !== key)
    });

    console.log("filteredAddress" + filteredAddresses)

    this.setState({
      addresses: filteredAddresses
    });
  }
  
  handleFilename(event) {
    this.setState({filename: event.target.value})
  }

  render(){
    const csvDownloadHeaders = [
      {label: 'Address', key: 'key'},
      {label: 'btc:', key: 'cryptoAmount'},
      {label: 'USD:', key: 'fiatAmount'}
    ];
    
    return (
      <div className="addressList">
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={this.handleCsvImport}
        />
        <div>
          <form>
            <CSVLink data={this.state.addresses} 
              filename={this.state.filename}
              className="btn btn-primary"
              headers={csvDownloadHeaders}
              target="_blank"
            >
                Download me
            </CSVLink>
            <input onChange={this.handleFilename}></input>
          </form>
        </div>
        <Totals addresses={this.state.addresses} />
        <div className="inputForm">
          <form onSubmit={this.addAddress}>
            <input ref={(a) => this._inputElement = a}>
            </input>
            <button type="submit">Enter a New PaperWallet</button>
          </form>
          <button type="balance" onClick={this.checkBalance}>Check Balance</button>
        </div>
        <Addresses entries={this.state.addresses}
                   delete={this.deleteAddress}
        />
      </div>
    );
  }
}


export default AddressList;