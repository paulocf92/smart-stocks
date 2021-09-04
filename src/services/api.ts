import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cloud.iexapis.com/stable/stock',
});
