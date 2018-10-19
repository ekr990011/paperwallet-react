import React, { Component } from "react";
import QRCode from 'qrcode.react';
import Clipboard from 'react-clipboard-polyfill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class Addresses extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      address: ''
    };
    
    this.toggleModal = this.toggleModal.bind(this);
    this.createAddresses = this.createAddresses.bind(this)
  }
  
  handleAddressState(address) {
    this.setState({address: address});
    this.toggleModal();
  }
  
  toggleModal(address) {
    this.setState({modal: !this.state.modal});
  }

  createAddresses(address) {
    return <li key={address.key} onClick={() => this.handleAddressState(address.key)}>
      {address.key} {" "}
      {address.cryptoAmount} {" "}
      {address.fiatAmount}
      {" "} <button onClick={() => this.delete(address.key)}>remove</button> 
    </li>
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    let addressEntries = this.props.entries;
    let listAddresses = addressEntries.map(this.createAddresses);
    let address = this.state.address;

    return (
      <ul className="theList">
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>
            <Clipboard text={address}>
              <div>
                {address}
                <FontAwesomeIcon icon="copy" />
              </div>
            </Clipboard>
          </ModalHeader>
          <ModalBody>
            <QRCode value={address} />
          </ModalBody>
        </Modal>
        
          {listAddresses}
        
      </ul>
    )
  }
}


export default Addresses;