import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import { User } from "../shared/models/User.model";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../shared/models/JWTPayload.model";
import { UserContext } from "../shared/context/UserContext";
import Profile from "../shared/components/Profile/Profile";
import { getUserData } from "../services/UserService";

export default function Profilepage() {
  const { userId } = useParams();
  const [userDataProfile, setUserDataProfile] = useState<User | null>(null);
  const userContext = useContext(UserContext);

  const fetchUserData = useCallback(() => {
    if (!userId) return;
    const userIdNumber = parseInt(userId);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<JWTPayload>(token);
      if (userIdNumber == decodedToken.user.id && userContext?.user) {
        setUserDataProfile(userContext.user);
      } else {
        getUserData(userIdNumber).then((response) => {
          console.log("getUserData response", response.data);
          setUserDataProfile(response.data);
        });
      }
    }
  }, [userId, userContext]);

  useEffect(fetchUserData, [fetchUserData]);

  return (
    <>
      {userDataProfile ? (
        <Profile userData={userDataProfile} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
