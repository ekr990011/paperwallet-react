import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../styles/components/cryptodropdown/cryptodropdown.scss';

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
        { name: "Ethereum", sym: "eth", cryptoId: 1027},
        //{ name: "Ripple", sym: "xrp", cryptoId: 52},
        { name: "BitcoinCash", sym: "bch", cryptoId: 1831},
        { name: "Litecoin", sym: "ltc", cryptoId: 2},
        { name: "Peercoin", sym: "ppc", cryptoId: 5},
        { name: "Dogecoin", sym: "doge", cryptoId: 74},
        { name: "Namecoin", sym: "nmc", cryptoId: 3},
        { name: "EthereumClassic", sym: "etc", cryptoId: 1321},
        { name: "Vertcoin", sym: "vtc", cryptoId: 99},
        { name: "Dash", sym: "dash", cryptoId: 131},
        { name: "BitcoinGold", sym: "btg", cryptoId: 2083},
        { name: "Neo", sym: "neo", cryptoId: 1376},
        { name: "NeoGas", sym: "gas", cryptoId: 1785},
        { name: "Qtum", sym: "qtum", cryptoId: 1684},
        { name: "Komodo", sym: "kmd", cryptoId: 1521},
        { name: "Bitcoinz", sym: "btcz", cryptoId: 2041},
        //{ name: "BitcoinPrivate", sym: "btcp", cryptoId: 2571},
        { name: "Zencash", sym: "zen", cryptoId: 1698},
        { name: "Zcash", sym: "zec", cryptoId: 1437},
        { name: "ZClassic", sym: "zcl", cryptoId: 1447},
        { name: "Decred", sym: "dcr", cryptoId: 1168},
        { name: "Digibyte", sym: "dgb", cryptoId: 109}
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
    this.props.handleCheckBalanceState("unchecked");
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
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.dropdownValue}
        </DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 200,
                  },
                };
              },
            },
          }}
          className="crypto-list-dropdown"
        >
          {listCryptos}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}