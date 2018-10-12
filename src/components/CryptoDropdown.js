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
        { name: "Bitcoin", sym: "btc", cryptoId: 1},
        { name: "Ethereum", sym: "eth", cryptoId: 1027}
      ],
      dropdownValue: "Bitcoin"
    };
  }
  
  cryptoList(crypto) {
    return <DropdownItem key={crypto.name} onClick={() => this.toggleCrypto(crypto)}>
        {crypto.name}
    </DropdownItem>
  }
  
  toggleCrypto(crypto) {
    this.setState({dropdownValue: crypto.name});
    this.props.handleCryptoSymId(crypto.sym, crypto.cryptoId);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render(props) {
    var cryptoList = this.state.crypto;
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