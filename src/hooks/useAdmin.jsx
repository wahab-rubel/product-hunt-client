import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth(); // Destructuring user and loading from useAuth
    const axiosSecure = useAxiosSecure(); // Secure Axios instance

    // ✅ React Query to check admin status
    const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email], // Unique key for caching and refetching
        enabled: !!user?.email && !loading, // Only run if user email exists and auth loading is false
        queryFn: async () => {
            console.log('Checking admin status for:', user?.email); // Optional console log for debugging
            const res = await axiosSecure.get(`/users/admin/${user.email}`); // API call to check admin
            console.log('Admin status response:', res.data); // Optional console log for debugging
            return res.data?.admin; // Return only boolean value
        },
    });

    return [isAdmin, isAdminLoading]; 
};

export default useAdmin;
