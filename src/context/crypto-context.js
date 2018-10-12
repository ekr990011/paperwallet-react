import {createContext} from 'react';

export const cryptoContext = {
  cryptoSym: "btc",
  cryptoId: 1,
  handleCryptoSymId: () => {},
};

export const CryptoContext = createContext({
  cryptoContext
});