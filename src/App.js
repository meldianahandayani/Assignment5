import React, { useEffect, useState } from 'react';

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    // Fetch data dari CurrencyFreaks API
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
        const data = await response.json();

        // Mata uang yang ingin diproses
        const selectedCurrencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

        // Filter data
        const rates = Object.entries(data.rates)
          .filter(([currency]) => selectedCurrencies.includes(currency))
          .map(([currency, rate]) => ({
            currency,
            exchangeRate: parseFloat(rate), // Convert ke float
            weBuy: parseFloat(rate) * 1.05, // Tambah 5%
            weSell: parseFloat(rate) * 0.95, // Kurang 5%
          }));

        setExchangeRates(rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'orange', minHeight: '100vh' }}>
      <h1>Currency Exchange Rates</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Currency</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Exchange Rate</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>We Buy</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((rate) => (
              <tr key={rate.currency}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{rate.currency}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{rate.exchangeRate.toFixed(2)}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{rate.weBuy.toFixed(2)}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{rate.weSell.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: '20px', fontStyle: 'italic', fontSize: '16px' }}>
        Rates are based from 1 USD, this application uses API from <a href="https://currencyfreaks.com" target="_blank" rel="noopener noreferrer">https://currencyfreaks.com</a>.
      </p>
    </div>
  );
}

export default App;
