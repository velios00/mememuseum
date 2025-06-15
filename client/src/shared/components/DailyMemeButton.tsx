import { useState } from "react";
import { Box, Fab, Paper, Typography, IconButton, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function FloatingHintButton() {
  const [showHint, setShowHint] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/meme-of-the-day");
  };

  return (
    <Box
      position="fixed"
      bottom={16}
      right={16}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      zIndex={1300}
    >
      <Fade in={showHint}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 1,
            maxWidth: 250,
            position: "relative",
            backgroundColor: "#fff",
            borderRadius: "15px",
          }}
        >
          <IconButton
            size="small"
            onClick={() => setShowHint(false)}
            sx={{ position: "absolute", top: 1, right: 4 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">
            Ehi! Clicca sull'icona qui sotto per vedere il meme del giorno!
          </Typography>
        </Paper>
      </Fade>

      {/* Bottone con immagine */}
      <Fab
        onClick={handleClick}
        sx={{
          width: 70,
          height: 70,
          backgroundColor: "#fff",
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <img
          src="../src/assets/doge.png" // <-- Cambia con il path della tua immagine
          alt="doge"
          style={{ width: 140, height: 140, objectFit: "cover" }}
        />
      </Fab>
    </Box>
  );
}
