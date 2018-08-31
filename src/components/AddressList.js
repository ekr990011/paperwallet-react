import React, { Component } from "react";
import Addresses from './Addresses';

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: []
    };
    this.addAddress = this.addAddress.bind(this);
  }

  addAddress(e) {
    if (this._inputElement.value !== "") {
      var newAddress = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          addresses: prevState.addresses.concat(newAddress)
        };
      });
    }

    this._inputElement.value = "";

    console.log(this.state.addresses);

    e.preventDefault();
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
        <Addresses entries={this.state.addresses}/>
      </div>
    );
  }
}


export default AddressList;