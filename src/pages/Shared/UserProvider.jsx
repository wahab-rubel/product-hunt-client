export const UserProvider = ({ children }) => {
 const { user, loading } = useAuth(); 
 const [isSubscribed, setIsSubscribed] = useState(false);

 useEffect(() => {
   if (user) {
     const subscriptionStatus = localStorage.getItem(`${user.uid}_subscribed`);
     if (subscriptionStatus === "true") {
       setIsSubscribed(true);
     }
   }
 }, [user]);

 const subscribe = () => {
   setIsSubscribed(true);
   if (user) {
     localStorage.setItem(`${user.uid}_subscribed`, "true");
   }
 };

 if (loading) {
   return <div>Loading...</div>; 
 }

 return (
   <UserContext.Provider value={{ user, isSubscribed, subscribe }}>
     {children}
   </UserContext.Provider>
 );
};
