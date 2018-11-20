import axios from 'axios';

export const litecoinApi = (addresses, resolve, reject) => {
  let done = false;
  let addressesBalance = {};
  
  addresses.forEach(address => {
    axios.get("https://chain.so/api/v2/get_address_balance/LTC/" + address + "/6")
      .then(res => {
        const data = res.data.data.confirmed_balance;
        addressesBalance[address.toString()] = data.toString();
      }).then(() => {
          resolve(addressesBalance);
      }).catch(error => {
          reject(error);
      });
  });
};
