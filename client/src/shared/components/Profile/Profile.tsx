import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { User } from "../../models/User.model";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MemeCard from "../MemeCard";
import { getUserMemes } from "../../../services/UserService";
import { Meme } from "../../models/Meme.model";

export default function Profile(props: { userData: User }) {
  const userContext = useContext(UserContext);
  const { userId } = useParams();
  const userIdNumber = userId ? parseInt(userId) : null;
  const [memes, setMemes] = useState<Meme[]>([]);

  const isOwnProfile =
    userContext && userContext.user && userIdNumber
      ? userIdNumber === userContext.user.id
      : false;

  useEffect(() => {
    getUserMemes(props.userData.id)
      .then((res) => {
        setMemes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching memes:", err);
        setMemes([]); //fallback vuoto
      });
  }, [props.userData.id]);

  return (
    <>
      <Box sx={{ maxWidth: "700px", margin: "auto", p: 3 }}>
        <Paper sx={{ p: 3, mb: 4, backgroundColor: "#151d26" }} elevation={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={props.userData.profileImage}
              sx={{ width: 100, height: 100 }}
              alt={props.userData.userName}
            />
            <Box>
              <Typography variant="h4" color="white" fontWeight="bold">
                {props.userData.userName}
              </Typography>
              {isOwnProfile && (
                <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                  Modifica Avatar
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        <Typography variant="h4" color="white" fontWeight="bold">
          Meme pubblicati
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {memes === null ? (
          <CircularProgress />
        ) : memes.length === 0 ? (
          <Typography>Nessun meme pubblicato.</Typography>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            alignItems={"center"}
            mt={2}
          >
            {memes.map((meme, index) => (
              <MemeCard meme={meme} key={meme.id} memeIndex={index} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
