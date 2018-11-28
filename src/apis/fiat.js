import axios from 'axios';

export const fiatPriceCheck = (cryptoName, handlefiatPrice, resolve, reject) => {
    axios.get("https://api.coingecko.com/api/v3/coins/" + cryptoName.toLowerCase() + "?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false", {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).then(res => {
        // console.log(res.data.market_data.current_price);
        const price = res.data.market_data.current_price.usd;
        handlefiatPrice(price);
        resolve('Fiat Done');
      }).catch(error => {
        console.log(error);
        reject(error);
      });
};