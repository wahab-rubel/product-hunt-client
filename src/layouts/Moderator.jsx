// ModeratorRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import useModerator from '../hooks/useModerator'; 
import Loading from '../components/Shared/Loading';

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isModerator, isModeratorLoading] = useModerator();
  const location = useLocation();

  if (loading || isModeratorLoading) return <Loading />;

  if (user && isModerator) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ModeratorRoute;
