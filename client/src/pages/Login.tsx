import { FormEvent, useCallback, useContext } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { login } from "../services/AuthService";
import { LoginData } from "../shared/models/LoginData.model";
import { UserContext } from "../shared/context/UserContext";
import { User } from "../shared/models/User.model";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../shared/models/JWTPayload.model";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

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
      login(authRequest)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode<JWTPayload>(token);
          const user: User = {
            id: decodedToken.user.id,
            userName: decodedToken.user.userName,
            profileImage: decodedToken.user.profileImage,
          };
          userContext?.setUser(user);
          window.dispatchEvent(new Event("storage"));
        })
        .catch((error) => {
          toast.error("Login Fallito. Usa credenziali diverse");
          console.error("Login error: ", error);
        });
    },
    [loginData.pwd.value, loginData.usr.value, userContext]
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
            Accedi
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
          <Box display={"flex"} gap={1} justifyContent="center">
            <Typography
              variant="body2"
              align="center"
              className="mt-6 text-gray-600"
            >
              Non hai un account?
            </Typography>
            <Link to="/register" className="text-blue-500 hover:underline">
              Registrati
            </Link>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
