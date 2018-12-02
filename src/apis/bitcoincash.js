import axios from 'axios';

export const bchApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  addresses.forEach(address => {
    addressRequests.push("https://api.blockchair.com/bitcoin-cash/dashboards/address/" 
    + address);
  });
  
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }
  
  function axiosRequest() {
    axios.get(addressRequests[i])
    .then((res) => {
      console.log(res);
      const data = res.data.data[addresses[i]];
      console.log('data', data.address.balance);
      addressesBalance[addresses[i]] = data.address.balance / 100000000;
    }).catch((error) => {
      console.log(error);
    });
  }
  
  let i;
  for (i=0; i<addressRequests.length; i++) {
    await axiosRequest(addressRequests[i], addresses[i]);
    await delay();
  }
  resolve(addressesBalance);
};
