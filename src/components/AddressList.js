import React, { Component } from "react";
import Addresses from './Addresses';
import WAValidator from 'wallet-address-validator';
import axios from 'axios';

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      cryptoSym: this.props.cryptoSym,
      cryptoId: this.props.cryptoId
    };
    
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
            text: addresses[i],
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
            text: addresses[i],
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


  addAddress(event) {
      const addObject = this.state.addresses;
      
      const checkDuplicateArray = (addObject.map(a => a.key));
      const duplicate = checkDuplicateArray.includes(this._inputElement.value);
      if (duplicate) {
        alert("you have entered a duplicte address");

      } else if (this._inputElement.value !== ""
                && WAValidator.validate(this._inputElement.value, this.props.cryptoSym))  {
        var newAddress = {
          text: this._inputElement.value,
          key: this._inputElement.value,
          cryptoAmount: 0,
          fiatAmount: 0
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
    if (prevProps.cryptoSym !== this.props.cryptoSym) {
      this.setState(() => {
        return {
         addresses: [] 
        };
      });
    }
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

  render(){
    return (
      <div className="addressList">
        <div className="inputForm">
          <form onSubmit={this.addAddress}>
            <input ref={(a) => this._inputElement = a}>
            </input>
            <button type="submit">Enter a New PaperWallet</button>
          </form>
          <button type="balance" onClick={this.checkBalance}>Check Balance</button>
        </div>
        <Addresses entries={this.state.addresses}
                    delete={this.deleteAddress}/>
      </div>
    );
  }
}


export default AddressList;