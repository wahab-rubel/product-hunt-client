import axios from "axios";

// Create an axios instance for public requests
const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000/products',  
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
