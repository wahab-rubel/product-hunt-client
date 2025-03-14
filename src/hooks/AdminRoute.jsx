import { useAdmin } from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/" />; // Redirect if not admin

  return children;
};

export default AdminRoute;
