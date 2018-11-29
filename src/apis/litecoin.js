import axios from 'axios';

export const litecoinApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  addresses.forEach(address => {
    addressRequests.push("https://api.blockchair.com/litecoin/dashboards/address/" + address);
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
  
  // addressRequests for((apiCall, index) => {
  //   async function asynchLitecoinApi () {
  //     axios.get(apiCall).then((response) => {
  //       const data = response.data.data[addresses[0]];
  //       console.log('data', data.address.balance);
  //     });
  //     //const response = await "fucking hell";
       
  //     // const data = response.data.data;
  //     // addressesBalance[data.address.toString()] = data.confirmed_balance.toString();
  //     await delay();
  //     // console.log("fuck you", data, index);
  //   }
  //   asynchLitecoinApi();
  // });
  
  
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
