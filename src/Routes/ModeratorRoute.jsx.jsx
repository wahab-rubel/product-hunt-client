import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const ModeratorRoute = ({ children }) => {
  const { user, role, loading } = AuthContext();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (user && role === "moderator") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ModeratorRoute;
