import axios from 'axios';

export const fiatPriceCheck = (cryptoId, handlefiatPrice, resolve, reject) => {
    axios.get("https://api.coinmarketcap.com/v2/ticker/" + cryptoId + "/")
      .then(res => {
        const price = res.data.data.quotes.USD.price;
        handlefiatPrice(price);
        resolve('Fiat Done');
      }).catch(error => {
        reject(error);
      });
};