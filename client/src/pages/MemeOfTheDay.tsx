import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import MemeCard from "../shared/components/MemeCard";

interface Meme {
  id: number;
  title: string;
  image: string;
  Tags?: { tagName: string }[];
}

export default function MemeOfTheDay() {
  const [meme, setMeme] = useState<Meme | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/meme-of-the-day")
      .then((res) => setMeme(res.data))
      .catch((err) => console.error("Errore nel caricamento del meme:", err));
  }, []);

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" mb={2}>
        Meme del Giorno
      </Typography>

      {!meme ? (
        <CircularProgress />
      ) : (
        <MemeCard
          id={meme.id}
          title={meme.title}
          image={meme.image}
          tags={meme.Tags?.map((t) => t.tagName) || []}
        />
      )}
    </Box>
  );
}
