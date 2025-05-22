import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import MemeCard from "../shared/components/MemeCard";
import DailyMemeButton from "../shared/components/DailyMemeButton";
import { Meme } from "../shared/models/Meme.model";

export default function Homepage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [filter, setFilter] = useState<string>("top");
  const [page, setPage] = useState(1);

  const fetchMemes = useCallback(async () => {
    const res = await axios.get(`http://localhost:3000/memes`, {
      params: {
        filter,
        page,
      },
    });
    setMemes(res.data);
  }, [filter, page]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes, filter, page]);

  return (
    <>
      <Box p={3}>
        <Typography variant="h4" mb={2}>
          Homepage Meme
        </Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "#1e2936",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <MenuItem value="top">Piu' piaciuti</MenuItem>
          <MenuItem value="down">Meno piaciuti</MenuItem>
          <MenuItem value="new">Recenti</MenuItem>
          <MenuItem value="old">Vecchi</MenuItem>
        </Select>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={2}
          gap={3}
        >
          {memes.map((meme, index) => (
            <MemeCard meme={meme} key={meme.id} memeIndex={index} />
          ))}
        </Box>

        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"space-between"}
          mt={2}
        >
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Avanti
          </Button>
        </Box>
      </Box>
      <DailyMemeButton />
    </>
  );
}
