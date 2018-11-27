import axios from 'axios';

export const litecoinApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  function delay() {
    return new Promise(resolve1 => {
      setTimeout(() => resolve1(), 3000);
    });
  }
  
  addresses.forEach(address => {
    addressRequests.push("https://chain.so/api/v2/get_address_balance/LTC/" + address + "/6");
  });
  
  let i;
  for (i = 0; i < addressRequests.length; i++) {
      await axios.get(addressRequests[i])
      .then((res) => {
        const data = res.data.data;
        addressesBalance[data.address.toString()] = data.confirmed_balance.toString();
      }).catch((err) => {
        console.log(err.response);
      });
      await delay();
      console.log('omg plx', i);
  }
  
  resolve(addressesBalance);
  
  
  // axios.all(addressRequests.map(l => axios.get(l)))
  // .then(axios.spread((...res) => {
  //   let i;
  //   for(i = 0; i < res.length; i++) {
  //     const data = res[i].data.data;
  //     addressesBalance[data.address.toString()] = data.confirmed_balance.toString();
  //   }
    
  //   resolve(addressesBalance);
  // })).catch((error) => {
  //   reject(error);
  // });
};
