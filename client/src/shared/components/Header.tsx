import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goToProfile = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: "#1e2936",
        width: "100%",
        padding: 2,
        mx: "auto",
        borderRadius: 5,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#218cff", fontWeight: "bold" }}
          onClick={() => {
            navigate("/upload");
          }}
        >
          Carica
        </Button>
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/")}
        >
          MemeMuseum
        </Typography>

        {user ? (
          <Box
            onClick={goToProfile}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              src={user.image || ""}
              alt={user.username}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography variant="h6">{user.username}</Typography>
          </Box>
        ) : (
          <Box display={"flex"} gap={1}>
            <Button
              sx={{ color: "white", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Accedi
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#218cff", fontWeight: "bold" }}
              onClick={() => navigate("/register")}
            >
              Registrati
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
