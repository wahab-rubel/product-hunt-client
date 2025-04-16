// src/Routes/ModeratorRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useModerator from "../hooks/useModerator"; // custom hook
import { AuthContext } from "../context/AuthContext";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isModerator, isModeratorLoading] = useModerator();
  const location = useLocation();

  if (loading || isModeratorLoading) {
    return <p>Loading...</p>;
  }

  if (user && isModerator) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ModeratorRoute;