import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class CryptoDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleCrypto = this.toggleCrypto.bind(this);
    this.cryptoList = this.cryptoList.bind(this);
    
    this.state = {
      dropdownOpen: false,
      crypto: [
        { name: "Bitcoin", sym: "btc", number: 1},
        { name: "Ethereum", sym: "eth", number: 1027}
      ],
      dropdownValue: "Bitcoin"
    };
  }
  
  cryptoList(crypto) {
    return <DropdownItem key={crypto.name} onClick={this.toggleCrypto}>
        {crypto.name}
    </DropdownItem>
  }
  
  toggleCrypto(event) {
    this.setState({dropdownValue: event.currentTarget.textContent});
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    var cryptoList = this.state.crypto;
    console.log(cryptoList);
    var listCryptos = cryptoList.map(this.cryptoList);
    
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu>
          {listCryptos}
        </DropdownMenu>
      </Dropdown>
    );
  }
}