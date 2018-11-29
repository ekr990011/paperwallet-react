import axios from 'axios';

export const dashApi = async (addresses, resolve, reject) => {
  let addressesBalance = {};
  let addressRequests = [];
  
  
  for (let  j=0; j<addresses.length; j++ )
    addressRequests.push("https://api.blockcypher.com/v1/dash/main/addrs/" + 
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
      addressesBalance[addresses] = data / 100000000;
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
  
