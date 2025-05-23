import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //impedisce il comportamento predefinito del form
    setError(""); //azzera l'errore precedente

    try {
      const response = await axios.post("http://localhost:3000/register", {
        userName: username,
        password: password,
      });

      const { token } = response.data; //estrai il token dalla risposta

      localStorage.setItem("token", token); //salva il token nel local storage

      toast.success("Registrazione effettuata con successo!");
      navigate("/login");
    } catch (err) {
      toast.error("Registrazione fallita!");
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
          Crea account
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
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" fullWidth type="submit">
            Registrati
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          className="mt-6 text-gray-600"
        >
          Hai già un account?
          <a href="/login" className="text-blue-500 hover:underline">
            Accedi
          </a>
        </Typography>
      </Paper>
    </div>
  );
}
