import React, { useEffect, useState } from 'react';

function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'ca753d75269644ea813e2fe9e6e92938'; // Ganti dengan API Key Anda

  useEffect(() => {
    // Fetch data dari CurrencyFreaks API
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${API_KEY}`);
        const data = await response.json();

        // Mata uang yang ingin diproses
        const selectedCurrencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

        // Filter data berdasarkan mata uang yang dipilih
        const rates = Object.entries(data.rates)
          .filter(([currency]) => selectedCurrencies.includes(currency))
          .map(([currency, rate]) => ({
            currency,
            exchangeRate: parseFloat(rate), // Convert ke float
            weBuy: parseFloat(rate) * 1.05, // Tambahkan 5%
            weSell: parseFloat(rate) * 0.95, // Kurangi 5%
          }));

        setExchangeRates(rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
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
