import axios from 'axios';

export const litecoinApi = (addresses) => {
  // const axios = require('axios')
  // const addresses =  ['LWcXUB6ny88tK49TK1V6KprE5oDcJ1zJhx', 'LTdsVS8VDw6syvfQADdhf2PHAm3rMGJvPX']
  let addressesBalance = {};
  
  // es6 Array.forEach()
  addresses.forEach(address => {
    axios.get("https://chain.so/api/v2/get_address_balance/LTC/" + address + "/6")
      .then(res => {
        const data = res.data.data.confirmed_balance;
        console.log(data);
        addressesBalance[address.toString()] = data.toString();
        console.log(addressesBalance);
      }).then(() => {
          console.log('addressesBalance', addressesBalance);
          return addressesBalance;
      }).catch(error => {
          console.log(error);
      });
  });
};
