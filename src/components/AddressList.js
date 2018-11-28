import React, { Component } from "react";
import WAValidator from 'wallet-address-validator';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import {CSVLink} from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, FormGroup, Popover, PopoverHeader, PopoverBody,
         Modal, ModalHeader, ModalBody, Table, Input } from 'reactstrap';

import '../styles/components/addresslist/addresslist.scss';
import Addresses from './Addresses';
import Totals from './Totals';
import {bitcoinApi} from '../apis/bitcoin';
import {litecoinApi} from '../apis/litecoin';
import {dashApi} from '../apis/dash';
import {zcashApi} from '../apis/zcash';
import {dogeApi} from '../apis/doge';
import {fiatPriceCheck} from '../apis/fiat';

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      cryptoSym: this.props.cryptoSym,
      cryptoId: this.props.cryptoId,
      filename: 'PaperWalletChecker.csv',
      checkbalanceState: this.props.checkbalanceState,
      popoverOpenInfo: false,
      modal: false
    };
    
    this.handleFilename = this.handleFilename.bind(this);
    this.handleCsvImport = this.handleCsvImport.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    this.clearAddresses(prevProps);
  }
  
  // fiatPriceCheck() {
  //   axios.get("https://api.coinmarketcap.com/v2/ticker/" + this.props.cryptoId + "/")
  //     .then(res => {
  //       const price = res.data.data.quotes.USD.price;
  //       this.props.handlefiatPrice(price);
  //     })
  // }
  
  // cryptoAmountCheck() {
  //   const addresses = this.state.addresses.map(a => a.key);
  //   
  //   axios.get("https://multiexplorer.com/api/address_balance/private5?addresses="
  //             + addresses.toString() + "&currency=" + this.props.cryptoSym)
  //   .then(res => {
  //     const data = res.data.balance;
  //     
  //     let i;
  //       for (i = 0; i < addresses.length; i++) {
  //         console.log(addresses[i]);
  //         const addressBalance = data[addresses[i]];
  //         const updateAddress = addresses[i];
  //         const index = this.state.addresses.findIndex(x => x.key === updateAddress);
  //         const addressAttributes = {
  //           cryptoAmount: addressBalance,
  //           fiatAmount: addressBalance * this.props.fiatPrice
  //         };
  //         this.setState({
  //           addresses: [
  //              ...this.state.addresses.slice(0, index),
  //              Object.assign({}, this.state.addresses[index], addressAttributes),
  //              ...this.state.addresses.slice(index + 1)
  //           ]
  //         });
  //       }
  //     });
  // }
  clearAddresses(prevProps) {
    if (prevProps.cryptoSym !== this.props.cryptoSym) {
      this.setState({addresses: []});
      this.props.handleCheckBalanceState("unchecked");
      this.props.handlefiatPrice(0);
    }
  }
  
  toggleModal() {
    this.setState({modal: !this.state.modal});
  }
  
  toggleInfo() {
    this.setState({
      popoverOpenInfo: !this.state.popoverOpenInfo
    });
  }
  
  fiatPriceCheck() {
    axios.get("https://api.coinmarketcap.com/v2/ticker/" + this.props.cryptoId + "/")
      .then(res => {
        const price = res.data.data.quotes.USD.price;
        this.props.handlefiatPrice(price);
      });
  }
  
  checkBalance(event) {
    this.props.handleCheckBalanceState("checking");
    const cryptoId = this.props.cryptoId;
    const handlefiatPrice = this.props.handlefiatPrice;
    const addresses = this.state.addresses.map(a => a.key);
    const cryptoSym = this.props.cryptoSym;
    
    let fiatApis = new Promise(function(resolve, reject) {
          fiatPriceCheck(cryptoId, handlefiatPrice, resolve, reject);
    });
    
    let cryptoApis = new Promise(function(resolve, reject) {
      console.log(cryptoSym);
      switch(cryptoSym) {
        case 'btc':
          bitcoinApi(addresses, resolve, reject);
          break;
        case 'ltc':
          litecoinApi(addresses, resolve, reject);
          break;
        case 'dash':
          dashApi(addresses, resolve, reject);
          break;
        case 'zec':
          zcashApi(addresses, resolve, reject);
          break;
        case 'doge':
          dogeApi(addresses, resolve, reject);
          break;
        default:
          console.log("didn't get either");  
      }
    });
    
    const balancePromises = [fiatApis, cryptoApis];
    
    Promise.all(balancePromises)
      .then((result) => {
        console.log(result[1]);
        let i;
        for (i = 0; i < addresses.length; i++) {
          const addressBalance = result[1][addresses[i]];
          console.log(addressBalance);
          const updateAddress = addresses[i];
          const index = this.state.addresses.findIndex(x => x.key === updateAddress);
          const addressAttributes = {
            cryptoAmount: addressBalance,
            fiatAmount: addressBalance * this.props.fiatPrice
        };
        this.setState({
          addresses: [
            ...this.state.addresses.slice(0, index),
            Object.assign({}, this.state.addresses[index], addressAttributes),
            ...this.state.addresses.slice(index + 1)
          ]
        });
        }
      });
    
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
                addresses: prevState.addresses.concat(newAddress),
                modal: !this.state.modal
              };
            });
          }
        } else {
          // console.log("Please enter a valid address or check that you have selected : "
          //         + this.props.cryptoSym.toUpperCase());
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
  
  deleteAddress(key) { 
    var filteredAddresses = this.state.addresses.filter(function (address) {
      return (address.key !== key);
    });

    this.setState({
      addresses: filteredAddresses
    });
  }
  
  handleFilename(event) {
    this.setState({filename: event.target.value});
  }

  render(){
    const csvDownloadHeaders = [
      {label: 'Address', key: 'key'},
      {label: 'btc:', key: 'cryptoAmount'},
      {label: 'USD:', key: 'fiatAmount'}
    ];
    
    return (
      <div className="address-list row">
        <div className="col-3 address-buttons">
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
            <ModalHeader toggle={this.toggleModal}>
              <div>
                <h3>
                  Import Your Spreadsheet:
                </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <CSVReader
                cssClass="csv-import"
                onFileLoaded={this.handleCsvImport}
              />
            </ModalBody>
          </Modal>
          <Button type="balance" color="success" size="lg"
            onClick={this.checkBalance}
          >
            Check Balance
          </Button>
          <Button type="import" color="warning" size="lg"
            onClick={this.toggleModal}
          >
            Load Spreadsheet
          </Button>
          <form>
            <CSVLink data={this.state.addresses} 
              filename={this.state.filename}
              className="btn btn-lg btn-primary"
              headers={csvDownloadHeaders}
              target="_blank"
            >
                Export Spreadsheet
            </CSVLink>
            <h5 className="export-filename">Export Filename : </h5>
            <Input className="col-9" onChange={this.handleFilename}></Input>
          </form>
        </div>
        <div className="col-9">
          <div className="input-form col-12">
            <Form inline onSubmit={this.addAddress}>
              <FormGroup className="col-12 row no-gutters">
                <Input className="col-8" id="input-address-text" innerRef={(a) => this._inputElement = a} />
                <div className="col-4 input-address-buttons">
                  <Button className="input-address-submit" color="info" type="submit">Enter a New Paper Wallet</Button>
                  <Button id="Popover1" onClick={this.toggleInfo}>
                    <FontAwesomeIcon icon="question-circle" inverse className="" />
                  </Button>
                </div>
                <Popover className="popover" placement="bottom" isOpen={this.state.popoverOpenInfo}
                         target="Popover1" toggle={this.toggleInfo}
                >
                  <PopoverHeader className="text-center">Public Addresses Only</PopoverHeader>
                  <PopoverBody>
                    <ul>
                      <li>Validates the Public Address</li>
                      <li>Enter One Address at a Time</li>
                      <li>You can Import Public Keys from a Spreadsheet</li>
                      <li>Click on any Address to View a Qrcode</li>
                    </ul>
                  </PopoverBody>
                </Popover>
              </FormGroup>
            </Form>
          </div>
          <Table hover={true}>
            <Totals 
              addresses={this.state.addresses}
              checkBalanceState={this.props.checkBalanceState}
              cryptoSym={this.props.cryptoSym}
            />
            <Addresses entries={this.state.addresses}
                       delete={this.deleteAddress}
            />
          </Table>
        </div>
      </div>
    );
  }
}


export default AddressList;