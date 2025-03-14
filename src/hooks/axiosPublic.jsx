import axios from "axios";

// Create an axios instance for public requests
const axiosPublic = axios.create({
  baseURL: 'https://product-hunt-server-tawny.vercel.app/products',  
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
