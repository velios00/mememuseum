import { Box, Paper, Avatar, Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MemeCard from "../shared/components/MemeCard";
import axios from "axios";

export default function Profilepage() {
  interface Meme {
    id: number;
    title: string;
    image: string;
  }

  interface User {
    id: number;
    username: string;
    profileImage: string;
  }

  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const isMyProfile = localStorage.getItem("userId") === userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/user/${userId}`);
        setUser(userRes.data);

        const memeRes = await axios.get(
          `http://localhost:3000/user/${userId}/memes`
        );
        setMemes(memeRes.data);
      } catch (err) {
        console.error("Errore durante il recupero dell'utente:", err);
      }
    };
    fetchData();
  }, [userId]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
    }
  };
  if (!user || !memes) return <div>Caricamento...</div>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Paper elevation={3} className="w-full max-w-3x1 p-8 rounded-2x1">
        <Box className="flex items-center space-x-4 mb-4">
          <Avatar
            //src={`http://localhost:3000/${user.profileImage}`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5" component="h1">
            {user?.userName}
          </Typography>
        </Box>

        {isMyProfile && (
          <Box className="mb-4 space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
            <Button variant="contained" color="primary">
              Cambia immagine profilo
            </Button>
          </Box>
        )}

        <Typography variant="h6" component="h2" gutterBottom>
          Meme caricati:
        </Typography>
        <Grid container spacing={2}>
          {memes.map((meme) => (
            <Grid item xs={12} sm={6} md={4} key={meme.id}>
              <MemeCard id={meme.id} title={meme.title} image={meme.image} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
