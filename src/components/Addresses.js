import React, { Component } from "react";

class Addresses extends Component {
  constructor(props) {
    super(props);

    this.createAddresses=this.createAddresses.bind(this)
  }

  createAddresses(address) {
    return <li key={address.key}>
      {address.text} {" "}
      {address.cryptoAmount} {" "}
      {address.fiatAmount}
      {" "} <button onClick={() => this.delete(address.key)}>remove</button> 
    </li>
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    var addressEntries = this.props.entries;
    var listAddresses = addressEntries.map(this.createAddresses);

    return (
      <ul className="theList">
        
          {listAddresses}
        
      </ul>
    )
  }
}


export default Addresses;