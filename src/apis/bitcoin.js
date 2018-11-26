import axios from 'axios';

export const bitcoinApi = (addresses, resolve, reject) => {
  let addressesBalance = {};
  
  axios.get("https://blockchain.info/balance?active=" + addresses.toString().replace(/,/g, '|') + "&cors=true")
    .then(res => {
      const data = res.data;
      
      let i;
      for (i = 0; i < addresses.length; i++) {
        const addressBalance = data[addresses[i]].final_balance / 100000000;
        addressesBalance[addresses[i].toString()] = addressBalance.toString();
      }
      
      resolve(addressesBalance);
    }).catch((error) => {
      reject(error);
    });
    
};
       
        
  // addresses.forEach(address => {
  //   addressRequests.push("https://chain.so/api/v2/get_address_balance/BTC/" + address + "/3");
  // });
  
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
  //});