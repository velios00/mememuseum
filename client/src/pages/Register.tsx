import { FormEvent, useCallback, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { RegisterData } from "../shared/models/RegisterData.model";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { register } from "../services/AuthService";

export default function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterData>({
    usr: {
      value: "",
      validateCriteria: (value: string) => {
        if (value.length < 3) return "Username troppo corto";
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
        usr: registerData.usr.value,
        pwd: registerData.pwd.value,
      };
      register(authRequest).then(() => {
        toast.success("Registrazione effettuata con successo!");
        navigate("/login");
      });
    },
    [registerData]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-#151d26 px-4">
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
          <Button
            onClick={() => navigate("/")}
            color="primary"
            startIcon={<ArrowBackIosIcon />}
          >
            Home
          </Button>
        </Box>
        <Box
          component="form"
          noValidate
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h5"
            component="h1"
            align="center"
            color="white"
            gutterBottom
          >
            Crea account
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            value={registerData.usr.value}
            onChange={(e) =>
              setRegisterData((prev) => ({
                ...prev,
                usr: { ...prev.usr, value: e.target.value },
              }))
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            value={registerData.pwd.value}
            onChange={(e) =>
              setRegisterData((prev) => ({
                ...prev,
                pwd: { ...prev.pwd, value: e.target.value },
              }))
            }
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Registrati
          </Button>
          <Box display={"flex"} gap={1} justifyContent={"center"}>
            <Typography
              variant="body2"
              align="center"
              className="mt-6 text-gray-600"
            >
              Hai già un account?
            </Typography>
            <Link to="/login" className="text-blue-500 hover:underline">
              Accedi
            </Link>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
