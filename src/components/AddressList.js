import React, { Component } from "react";
import Addresses from './Addresses';
import WAValidator from 'wallet-address-validator';


var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'BTC');
if(valid)
	console.log('This is a valid address');
else
  console.log('Address INVALID');
  

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: []
    };
    this.addAddress = this.addAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
  }


  addAddress(e) {
    if (this._inputElement.value !== ""
              && WAValidator.validate(this._inputElement.value))  {
      var newAddress = {
        text: this._inputElement.value,
        key: Date.now()
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

    console.log(this.state.addresses);

    e.preventDefault();
  }

  deleteAddress(key) { 
    var filteredAddresses = this.state.addresses.filter(function (address) {
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
        </div>
        <Addresses entries={this.state.addresses}
                    delete={this.deleteAddress}/>
      </div>
    );
  }
}


export default AddressList;