import axios from 'axios';

export const dogeApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  
  for (let  j=0; j<addresses.length; j++ )
    addressRequests.push("https://api.blockcypher.com/v1/doge/main/addrs/" + 
      addresses[j] + "/balance");
    
  function delay() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }
  
  function axiosRequest(addressRequests, addresses) {
    axios.get(addressRequests)
    .then((res) => {
      console.log(res);
      const data = res.data.balance;
      console.log('data', data);
      addressesBalance[addresses] = data / 100000000000;
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
  console.log('addressesBalance', addressesBalance)
};
  










// 
// import axios from 'axios';
// 
// export const dogeApi = (addresses, resolve, reject) => {
//   let addressesBalance = {};
//   let addressRequests = [];
//   
//   addresses.forEach(address => {
//     addressRequests.push("https://chain.so/api/v2/get_address_balance/DOGE/" + address + "/3");
//   });
//   
//   axios.all(addressRequests.map(l => axios.get(l)))
//   .then(axios.spread((...res) => {
//     let i;
//     for(i = 0; i < res.length; i++) {
//       const data = res[i].data.data;
//       addressesBalance[data.address.toString()] = data.confirmed_balance.toString();
//     }
//     
//     resolve(addressesBalance);
//   })).catch((error) => {
//     reject(error);
//   });
// };
