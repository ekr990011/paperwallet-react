import React, { Component } from "react";
import QRCode from 'qrcode.react';
import Clipboard from 'react-clipboard-polyfill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader, ModalBody, Button, Popover, Alert } from 'reactstrap';

class Addresses extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      address: '',
      popoverOpen: false
    };
    
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.createAddresses = this.createAddresses.bind(this);
  }
  
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  
  handleAddressState(address) {
    this.setState({address: address});
    this.toggleModal();
  }
  
  toggleModal(address) {
    this.setState({modal: !this.state.modal});
  }

  createAddresses(address) {
    return (
      <tr key={address.key}>
        <td onClick={() => this.handleAddressState(address.key)}>
          {address.key}
        </td>
        <td>
          {address.cryptoAmount}
        </td>
        <td>
          {address.fiatAmount !== '' ? '$' + address.fiatAmount.toFixed(2) : address.fiatAmount}
        </td>
        <td>
          <Button size="sm" color="danger" onClick={() => this.delete(address.key)}>remove</Button> 
        </td>
      </tr>
    );
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    let addressEntries = this.props.entries;
    let listAddresses = addressEntries.map(this.createAddresses);
    let address = this.state.address;

    return (
      <tbody className="theList">
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>
            <div onClick={this.toggle}>
              <Clipboard text={address}>
                <div>
                  {address}
                </div>
                <div className="text-center">
                  <FontAwesomeIcon icon="copy" id="PopoverAddress" />
                </div>
              </Clipboard>
            </div>
            <Popover className="popoverAddress" placement="bottom" isOpen={this.state.popoverOpen}
                         target="PopoverAddress" toggle={this.toggle}
                         boundariesElement=".alert-copy-clipboard"
                >
                  <Alert color="warning" className="alert-copy-clipboard">
                    Copied to Clipboard
                  </Alert>
            </Popover>
          </ModalHeader>
          <ModalBody className="text-center">
            <QRCode value={address} level="H" className="qrcode-canvas" />
          </ModalBody>
        </Modal>
        
        {listAddresses}
      </tbody>
    );
  }
}


export default Addresses;