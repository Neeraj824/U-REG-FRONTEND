import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const App = () => {
  const [historicalRates, setHistoricalRates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistoricalRates(selectedDate);
  }, [selectedDate]);

  const fetchHistoricalRates = async (date) => {
    try {
      setLoading();
      const formattedDate = format(date, 'yyyy-MM-dd');
      const apiUrl = `${process.env.REACT_APP_API_URL}/${formattedDate}`;
      const response = await axios.get(apiUrl);
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
            <input type="date" value={format(selectedDate, 'yyyy-MM-dd')} onChange={(e) => handleDateChange(new Date(e.target.value))} />
          </div>
        </div>
        {loading ? (
          <p>Loading..</p>
        ) : historicalRates.length > 0 ? (
          <div className="currency-box-container">
            {historicalRates.map((rate, index) => (
              <div className="currency-box" key={index}>
                <div className="currency-name">{rate.code}</div>
                <div className="currency-rate">{rate.rate}</div>
              </div>
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