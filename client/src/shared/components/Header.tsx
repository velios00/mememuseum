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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoginIcon from "@mui/icons-material/Login";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const navigate = useNavigate();

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
      navigate(`/profile/${userContext?.user?.id}`, { replace: true });
      handleMenuClose();
    }
  }, [handleMenuClose, navigate, userContext?.user?.id]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    userContext?.setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  }, [navigate, userContext]);

  useEffect(() => {
    console.log("User data context updated yeah:", userContext);
  }, [userContext]);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        border: "2px solid red",
        backgroundColor: "#1e2936",
        width: "100%",
        padding: { xs: "0 8 px", sm: "0 16 px" },
        mx: "auto",
        borderRadius: 5,
        maxWidth: "1200px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Colonna sinistra */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {userContext?.user && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#218cff",
                  fontWeight: "bold",
                  display: { xs: "none", sm: "inline-flex" },
                }}
                onClick={() => navigate("/upload", { replace: true })}
              >
                Carica
              </Button>
              <IconButton
                onClick={() => navigate("/upload", { replace: true })}
                sx={{
                  color: "white",
                  display: { xs: "inline-flex", sm: "none" },
                }}
              >
                <CloudUploadIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Colonna centrale */}
        <Box
          sx={{
            border: "2px solid red",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
              },
            }}
            onClick={() => navigate("/", { replace: true })}
          >
            MemeMuseum
          </Typography>
        </Box>

        {/* Colonna destra */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {userContext?.user ? (
            <>
              <Typography
                variant="h6"
                sx={{ color: "white", display: { xs: "none", sm: "block" } }}
              >
                {userContext.user.userName}
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  src={userContext.user.profileImage || ""}
                  alt={userContext.user.userName}
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
            </>
          ) : (
            <>
              <Button
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  display: { xs: "none", sm: "flex" },
                }}
                onClick={() => navigate("/login")}
              >
                Accedi
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#218cff",
                  fontWeight: "bold",
                  display: { xs: "none", sm: "flex" },
                }}
                onClick={() => navigate("/register")}
              >
                Registrati
              </Button>
              <IconButton
                sx={{
                  border: "2px solid red",
                  color: "white",
                  display: { xs: "flex", sm: "none" },
                }}
                onClick={() => navigate("/login")}
              >
                <LoginIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  display: { xs: "flex", sm: "none" },
                }}
                onClick={() => navigate("/register")}
              >
                <AddReactionIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
