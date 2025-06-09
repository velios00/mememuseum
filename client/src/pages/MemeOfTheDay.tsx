import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import MemeCard from "../shared/components/MemeCard";
import { getMemeOfTheDay } from "../services/MemeService";
import { Meme } from "../shared/models/Meme.model";

export default function MemeOfTheDay() {
  const [meme, setMeme] = useState<Meme | null>(null);
  console.log("meme", meme);

  useEffect(() => {
    getMemeOfTheDay()
      .then((res) => setMeme(res.data))
      .catch((err) => console.error("Errore nel caricamento del meme:", err));
  }, []);

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" mb={2} sx={{ color: "white" }}>
        Meme of the Day!
      </Typography>

      {!meme ? (
        <CircularProgress />
      ) : (
        <MemeCard meme={meme} key={meme.id} memeIndex={0} />
      )}
    </Box>
  );
}
