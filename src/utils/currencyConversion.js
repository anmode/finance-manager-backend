const axios = require('axios');

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`);
  const rate = response.data.rates[toCurrency];
  return amount * rate;
};

module.exports = convertCurrency;
