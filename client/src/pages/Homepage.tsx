import { useCallback, useEffect, useState } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";
import MemeCard from "../shared/components/MemeCard";
import DailyMemeButton from "../shared/components/DailyMemeButton";
import { Meme } from "../shared/models/Meme.model";
import { getMemes } from "../services/MemeService";
import TagSearchBar from "../shared/components/TagSearchBar";

export default function Homepage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [filter, setFilter] = useState<string>("top");
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = useCallback(async () => {
    const res = await getMemes(filter, page, tags);
    setMemes(res.data);
    setHasMore(res.data.length > 0);
  }, [filter, page, tags]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  console.log("memes", memes);

  return (
    <>
      <Box p={3}>
        <TagSearchBar tags={tags} setTags={setTags} />

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

        {(page > 1 || hasMore) && (
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"center"}
            mt={4}
            gap={2}
          >
            {page > 1 && (
              <Button
                variant="outlined"
                onClick={() => setPage((prev) => prev - 1)}
              >
                Indietro
              </Button>
            )}

            {hasMore && (
              <Button
                variant="outlined"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Avanti
              </Button>
            )}
          </Box>
        )}
      </Box>
      <DailyMemeButton />
    </>
  );
}
