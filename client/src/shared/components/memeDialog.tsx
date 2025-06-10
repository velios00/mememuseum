import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { MemeDialogProps } from "../models/MemeDialogProps.model";
import { useCallback, useContext, useState } from "react";
import { Comment } from "../models/Comment.model";
import { UserContext } from "../context/UserContext";
import Votes from "./Votes";
import CloseIcon from "@mui/icons-material/Close";
import { addComment } from "../../services/CommentService";
import { useNavigate } from "react-router-dom";

export default function MemeDialog(props: { dialogProps: MemeDialogProps }) {
  const { open, meme, onClose, onNewComment } = props.dialogProps;
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(
    props.dialogProps.meme?.comments ?? []
  );

  const userContext = useContext(UserContext);

  const handleAddComment = useCallback(() => {
    if (userContext && userContext.user && comment.trim() !== "") {
      const newComment: Comment = {
        content: comment.trim(),
        User: userContext.user,
      };
      addComment(meme?.id, userContext.user.id, comment.trim())
        .then((response) => {
          setComments((prevComments) => [...prevComments, response.data]);
          setComment("");

          if (onNewComment) {
            //console.log"Ci passo");
            onNewComment();
          }
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  }, [comment, meme?.id, onNewComment, userContext]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="md"
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" } },
        paper: {
          sx: {
            backgroundColor: "#151d26",
            border: "1px solid #798fa6",
            borderRadius: "8px",
            width: "100%",
            height: "90vh",
            maxHeight: "900px",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          color: "#fff",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          p: 2,
        }}
      >
        {/* COLONNA IMMAGINE E INFO */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Autore */}
          <Box
            onClick={() => navigate(`/profile/${meme?.User.id}`)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <Avatar
              src={`http://localhost:3000/${meme?.User?.profileImage || ""}`}
              alt={meme?.User?.userName}
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="h5" color="white">
              {meme?.User?.userName}
            </Typography>
          </Box>

          {/* Immagine */}
          <Box
            component="img"
            src={`http://localhost:3000/${meme?.image}`}
            alt={meme?.title}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "70vh",
              borderRadius: 2,
              objectFit: "contain",
            }}
          />

          {/* Titolo */}
          <Typography
            variant="h4"
            color="white"
            sx={{ mt: 2, textAlign: "center", fontWeight: "bold" }}
          >
            {meme?.title}
          </Typography>

          {/* Tag */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {meme?.tags?.map((tag, idx) => (
              <Box
                key={idx}
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: "#218cff",
                  borderRadius: "16px",
                  fontSize: "0.75rem",
                  color: "white",
                }}
              >
                #{String(tag)}
              </Box>
            ))}
          </Box>
        </Box>

        {/* COLONNA COMMENTI */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          {/* Lista commenti */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 2,
              border: "1px solid #798fa6",
              borderRadius: 2,
              padding: 1,
              maxHeight: { xs: "300px", md: "100%" },
            }}
          >
            {comments.length === 0 ? (
              <Typography variant="body2" color="gray">
                Nessun commento ancora.
              </Typography>
            ) : (
              comments.map((comment, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 1,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    wordBreak: "break-word",
                  }}
                >
                  <Avatar
                    alt={comment.User?.userName}
                    src={`http://localhost:3000/${comment.User?.profileImage}`}
                    sx={{ width: 24, height: 24, cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/profile/${comment.userId}`);
                    }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/profile/${comment.userId}`);
                      }}
                    >
                      {comment.User?.userName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "pre-wrap", color: "white" }}
                    >
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Campo input + bottone */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Scrivi un commento..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{
                sx: {
                  backgroundColor: "#1e2a36",
                  color: "white",
                },
              }}
            />
            <Button variant="contained" onClick={handleAddComment}>
              Invia
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
