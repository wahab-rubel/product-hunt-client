import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure(); 

    // React Query for admin status
    const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            console.log('Checking admin status for:', user?.email);
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log('Admin status response:', res.data);
            return res.data?.admin;
        },
    });
    

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
