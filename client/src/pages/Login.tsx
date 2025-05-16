import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //impedisce il comportamento predefinito del form
    setError(""); //azzera l'errore precedente

    try {
      const response = await axios.post("http://localhost:3000/login", {
        userName: username,
        password: password,
      });

      console.log(response.data); //stampa la risposta del server

      const { token, user } = response.data; //estrai il token dalla risposta

      localStorage.setItem("token", token); //salva il token nel local storage
      localStorage.setItem("userId", user.id); //salva l'ID utente nel local storage

      alert("Registrazione avvenuta con successo!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Errore durante la registrazione"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Paper elevation={3} className="w-full max-w-md p-8 rounded-2x1">
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Accedi
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Accedi
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
