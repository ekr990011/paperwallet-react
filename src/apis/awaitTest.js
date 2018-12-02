var axios = require('axios');

 let response;
// let response2;

function delay() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 200);
  });
}

async function asynchApi () {
  const response = await axios.get('https://chain.so/api/v2/get_address_balance/LTC/LTdsVS8VDw6syvfQADdhf2PHAm3rMGJvPX/6');
    // .then(function(response){
    //   console.log(response.data);
    //   response = response.data;
   console.log('response in axios', response.data);
   await delay();
   
   const response2 = await axios.get('https://chain.so/api/v2/get_address_balance/LTC/LWcXUB6ny88tK49TK1V6KprE5oDcJ1zJhx/6');
   console.log('response2', response2.data);
   await delay();
   
   return response, response2;
    
  // });  
} 

asynchApi().then(_ => console.log('response', alert));
  
// console.log('response', response);