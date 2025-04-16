const AdminRoute = ({ children }) => {
 const { user, loading } = useContext(AuthContext);

 if (loading) return <LoadingSpinner />;

 if (user && user.email === "admin@example.com") {
   return children;
 }

 return <Navigate to="/" />;
};
