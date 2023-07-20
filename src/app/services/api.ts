import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const apiExternal = axios.create({
  baseURL: 'https://example-data.draftbit.com'
});
