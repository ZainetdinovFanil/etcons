// src/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // Замените на ваш API URL
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;