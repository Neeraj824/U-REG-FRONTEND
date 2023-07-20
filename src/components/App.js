import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import CurrencyBox from './CurrencyBox';
import '../styles/main.css';
import { fetchHistoricalRates } from '../utils/api';

const App = () => {
  const [historicalRates, setHistoricalRates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistoricalData(selectedDate);
  }, [selectedDate]);

  const fetchHistoricalData = async (date) => {
    try {
      setLoading(true);
      const response = await fetchHistoricalRates(date);
      setHistoricalRates(response.data);
    } catch (error) {
      console.error('Error fetching historical rates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <h1 className="center-align">Yet Another Forex</h1>
        <div className="date-container">
          <div>Rates as of {format(selectedDate, 'dd-MM-yyyy')}</div>
          <div>
            <input 
              type="date" 
              value={format(selectedDate, 'yyyy-MM-dd')} 
              onChange={(e) => handleDateChange(new Date(e.target.value))} 
            />
          </div>
        </div>
        {loading ? (
          <p>Loading..</p>
        ) : historicalRates.length > 0 ? (
          <div className="currency-box-container">
            {historicalRates.map((rate, index) => (
              <CurrencyBox key={index} code={rate.code} rate={rate.rate} />
            ))}
          </div>
        ) : (
          <p>No historical rates available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default App;