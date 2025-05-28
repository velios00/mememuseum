import { FormEvent, useCallback } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import toast from "react-hot-toast";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { login } from "../services/AuthService";
import { LoginData } from "../shared/models/LoginData.model";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    usr: {
      value: "",
      validateCriteria: (value: string) => {
        if (value.length < 3) return "Username troppo corto";
        if (value.length > 20) return "Username troppo lungo";
        return "";
      },
    },
    pwd: {
      value: "",
      validateCriteria: (value: string) => {
        if (value.length < 4) return "Password troppo corta";
        return "";
      },
    },
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const authRequest: AuthRequest = {
        usr: loginData.usr.value,
        pwd: loginData.pwd.value,
      };
      login(authRequest).then((response) => {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("storage"));
      });
    },
    [loginData]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg#151d26 px-4">
      <Paper
        elevation={3}
        className="w-full max-w-md p-8 rounded-2x1"
        sx={{ backgroundColor: "#1e2936" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mb: 2,
          }}
        >
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
        <Typography
          variant="h5"
          component="h1"
          align="center"
          color="white"
          gutterBottom
        >
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
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            value={loginData.usr.value}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                usr: { ...prev.usr, value: e.target.value },
              }))
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            type="password"
            value={loginData.pwd.value}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                pwd: { ...prev.pwd, value: e.target.value },
              }))
            }
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Accedi
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          className="mt-6 text-gray-600"
        >
          Non hai un account?
          <a href="/register" className="text-blue-500 hover:underline">
            Registrati
          </a>
        </Typography>
      </Paper>
    </div>
  );
}
