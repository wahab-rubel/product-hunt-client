// src/hooks/useModerator.js
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const useModerator = () => {
  const { user } = useContext(AuthContext);
  const [isModerator, setIsModerator] = useState(false);
  const [isModeratorLoading, setIsModeratorLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://your-api-url.com/users/moderator/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setIsModerator(data?.moderator === true);
          setIsModeratorLoading(false);
        });
    }
  }, [user]);

  return [isModerator, isModeratorLoading];
};

export default useModerator;
