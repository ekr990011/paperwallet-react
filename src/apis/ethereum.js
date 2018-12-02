import axios from 'axios';

export const ethApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  addresses.forEach(address => {
    addressRequests.push("https://api.blockchair.com/ethereum/dashboards/address/" 
    + address);
  });
  
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }
  
  function axiosRequest(addressRequests, addresses) {
    axios.get(addressRequests)
    .then((res) => {
      console.log(res);
      // addresses = addresses.toLowerCase();
      console.log('address', addresses);
      const data = res.data.data[addresses.toLowerCase()];
      console.log('data', data);
      addressesBalance[addresses] = data.address.balance / 1.0e18;
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
