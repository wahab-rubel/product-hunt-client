// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://product-hunt-server-tawny.vercel.app',
});

export default axiosInstance;
