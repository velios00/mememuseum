import { Box, CircularProgress, Typography } from "@mui/material";
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
      setUserDataProfile(response.data);
    });
  }, [userId]);

  useEffect(fetchUserData, [fetchUserData]);

  return (
    <>
      {userDataProfile ? (
        <Profile userData={userDataProfile} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography variant="h4" sx={{ color: "white" }}>
            Utente non trovato.
          </Typography>
        </Box>
      )}
    </>
  );
}
