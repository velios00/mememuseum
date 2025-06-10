import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { User } from "../shared/models/User.model";
import Profile from "../shared/components/Profile/Profile";
import { getUserData } from "../services/UserService";

export default function Profilepage() {
  const { userId } = useParams();
  const [userDataProfile, setUserDataProfile] = useState<User | null>(null);

  const fetchUserData = useCallback(() => {
    if (!userId) return;
    const userIdNumber = parseInt(userId);

    getUserData(userIdNumber).then((response) => {
      console.log("getUserData response", response.data);
      setUserDataProfile(response.data);
    });
  }, [userId]);

  useEffect(fetchUserData, [fetchUserData]);

  console.log("userDataProfilee", userDataProfile);

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
