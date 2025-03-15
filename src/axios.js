// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://product-hunt-server-n68wm3en9-wahab-rubels-projects.vercel.app/', 
  withCredentials: true, 
});

export default instance;
