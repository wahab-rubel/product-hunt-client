import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Create instance (only once)
const axiosSecure = axios.create({
    baseURL: 'https://product-hunt-server-tawny.vercel.app', // Correct base URL
});

// Add request interceptor (once)
axiosSecure.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add response interceptor (once)
axiosSecure.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            const { logOut } = useAuth(); // call inside to avoid hook error
            const navigate = useNavigate(); // call inside to avoid hook error
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

// Custom hook to return instance
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
