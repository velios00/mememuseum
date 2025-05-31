import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  // const { user, logout } = useAuth();
  const userContext = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const goToProfile = useCallback(() => {
    if (userContext?.user?.id) {
      navigate(`/profile/${userContext?.user?.id}`);
      handleMenuClose();
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  }, [localStorage]);

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

        {userContext ? (
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              {userContext?.user?.userName}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                src={userContext?.user?.profileImage || ""}
                alt={userContext?.user?.userName}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={goToProfile}>Profilo</MenuItem>
              <MenuItem onClick={handleLogout}>Esci</MenuItem>
            </Menu>
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
