import axios from 'axios';
import { format } from 'date-fns';

export const fetchHistoricalRates = async (date) => {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const apiUrl = `${process.env.REACT_APP_API_URL}/${formattedDate}`;
  const response = await axios.get(apiUrl);
  return response;
};
