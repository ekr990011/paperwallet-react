import axios from 'axios';

export const zcashApi = (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  addresses.forEach(address => {
    addressRequests.push("https://chain.so/api/v2/get_address_balance/ZEC/" + address + "/3");
  });
  
  axios.all(addressRequests.map(l => axios.get(l)))
  .then(axios.spread((...res) => {
    let i;
    for(i = 0; i < res.length; i++) {
      const data = res[i].data.data;
      addressesBalance[data.address.toString()] = data.confirmed_balance.toString();
    }
    
    resolve(addressesBalance);
  })).catch((error) => {
    reject(error);
  });
};
