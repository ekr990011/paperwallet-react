import axios from 'axios';

export const dashApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  addresses.forEach(address => {
    addressRequests.push("https://chain.so/api/v2/get_address_balance/DASH/" + address + "/3");
  });
  
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }
  
   let i;
  for (i=0; i<addressRequests.length; i++) {
    await axios.get(addressRequests[i])
    .then((res) => {
      console.log(res);
      const data = res.data.data;
      console.log('data', data.confirmed_balance.toString());
      addressesBalance[addresses[i]] = data.confirmed_balance.toString();
    }).catch((error) => {
      console.log(error);
    });
    await delay();
  }
  resolve(addressesBalance);
};
  
  // axios.all(addressRequests.map(l => axios.get(l)))
  // .then(axios.spread((...res) => {
  //   let i;
  //   for(i = 0; i < res.length; i++) {
  //     const data = res[i].data.data;
  //     addressesBalance[data.address.toString()] = data.confirmed_balance.toString();
  //   }
  //   
  //   resolve(addressesBalance);
  // })).catch((error) => {
  //   reject(error);
  // });

