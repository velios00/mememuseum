import {
  Box,
  Button,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadMeme() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Paper elevation={3} className="w-full max-w-md p-8 rounded-2x1">
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
          />
          <TextField
            label="Tag"
            variant="outlined"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
