import React, { Component } from "react";
import QRCode from 'qrcode.react';
import Modal from 'react-modal';
import Clipboard from 'react-clipboard-polyfill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Addresses extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalIsOpen: false
    };
    
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createAddresses = this.createAddresses.bind(this)
  }
  
  openModal(address) {
    this.setState({modalIsOpen: true});
    console.log(address);
    this.address = address;
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
    console.log("after open");
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  createAddresses(address) {
    return <li key={address.key} onClick={() => this.openModal(address.key)}>
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
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>{this.address}</div>
            <div><QRCode value={this.address} size={200} /></div>
            <Clipboard text={this.address}>
              <FontAwesomeIcon icon="copy" />
            </Clipboard>
          </Modal>
        
          {listAddresses}
        
      </ul>
    )
  }
}


export default Addresses;