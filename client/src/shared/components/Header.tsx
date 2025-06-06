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
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
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
    navigate("/", { replace: true });
  }, [navigate, userContext]);

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
        maxWidth: "1200px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {userContext?.user && (
          <>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#218cff",
                fontWeight: "bold",
                display: { xs: "none", sm: "inline-flex" },
              }}
              onClick={() => {
                navigate("/upload", { replace: true });
              }}
            >
              Carica
            </Button>
            <IconButton
              onClick={() => navigate("/upload", { replace: true })}
              sx={{
                color: "white",
                display: {
                  xs: "inline-flex",
                  sm: "none",
                },
              }}
            >
              <CloudUploadIcon />
            </IconButton>
          </>
        )}
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
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

        {userContext?.user ? (
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", display: { xs: "none", sm: "block" } }}
            >
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
