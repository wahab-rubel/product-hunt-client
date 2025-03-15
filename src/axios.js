// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://product-hunt-server-tawny.vercel.app', 
  withCredentials: true, 
});

export default instance;
