import { useState, useEffect } from 'react';
import useAuth from './useAuth'; // ✅ Make sure this path is correct

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!user?.email) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/products/users/admin/${user.email}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch admin status');
        }

        const data = await res.json();
        setIsAdmin(data?.isAdmin ?? false); // fallback in case it's undefined
      } catch (error) {
        console.error("❌ Error fetching admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user]);

  return [isAdmin, isLoading];
};

export default useAdmin;
