import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function UploadMeme() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!image) {
        return alert("Seleziona un'immagine da caricare");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("tag", tag);
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("image", image);

      try {
        await axios.post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/");
      } catch (err) {
        console.error("Errore durante il caricamento del meme:", err);
      }
    },
    [title, tag, image, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-#151d26 px-4">
      <Paper
        elevation={3}
        className="w-full max-w-md p-8 rounded-2x1"
        sx={{ backgroundColor: "#1e2936", color: "white" }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <ArrowBackIosIcon
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        </Box>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Carica il tuo meme
        </Typography>
        <Box
          component={"form"}
          noValidate
          autoComplete="off"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Titolo"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            label="Tag"
            variant="outlined"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <Button variant="contained" color="primary" type="submit">
            Carica
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
