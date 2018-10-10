import React, { Component } from "react";
import Addresses from './Addresses';
import WAValidator from 'wallet-address-validator';
import axios from 'axios';


// var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');
// if(valid)
// 	console.log('This is a valid address');
// else
//   console.log('Address INVALID');
  

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: []
    };
    this.addAddress = this.addAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
  }
  
  bitcoinAmountCheck() {
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
          // var address = addressesState.find(function (obj) { return obj.key === addresses[i]; });
          const newAddress = {
            text: addresses[i],
            key: addresses[i],
            cryptoAmount: addressBalance,
            fiatAmount: addressBalance * 6000
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
    this.bitcoinAmountCheck();
    
    const addressesState = this.state.addresses;
    console.log(addressesState);
    
    event.preventDefault();
  }


  addAddress(event) {
      const addObject = this.state.addresses;
      
      const checkDuplicateArray = (addObject.map(a => a.key));
      const duplicate = checkDuplicateArray.includes(this._inputElement.value);
      if (duplicate) {
        alert("you have entered a duplicte address");

      } else if (this._inputElement.value !== ""
                && WAValidator.validate(this._inputElement.value))  {
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