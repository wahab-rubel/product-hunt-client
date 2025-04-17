import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    const { user, loading } = useAuth(); 

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (loading) {
                return; // Don't fetch if user data is still loading
            }

            if (!user?.email) {
                setIsAdmin(false);
                setIsAdminLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `http://localhost:5000/users/admin/${user.email}` // ✅ Use the correct backend endpoint for checking admin status
                );

                if (!res.ok) {
                    console.error("❌ Error fetching admin status:", res.status);
                    throw new Error('Failed to fetch admin status');
                }

                const data = await res.json();
                setIsAdmin(data?.isAdmin ?? false);
            } catch (error) {
                console.error("❌ Error fetching admin status:", error);
                setIsAdmin(false);
            } finally {
                setIsAdminLoading(false);
            }
        };

        fetchAdminStatus();
    }, [user, loading]); // Depend on loading as well

    return [isAdmin, isAdminLoading];
};

export default useAdmin;