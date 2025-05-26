import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { MemeDialogProps } from "../models/MemeDialogProps.model";
import { useCallback, useContext, useState } from "react";
import { Comment } from "../models/Comment.model";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function MemeDialog(props: { dialogProps: MemeDialogProps }) {
  const { open, meme, onClose } = props.dialogProps;

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

      axios
        .post(
          `http://localhost:3000/memes/${props.dialogProps.meme?.id}/comments`,
          {
            userId: userContext.user.id,
            content: newComment.content,
          }
        )
        .then((response) => {
          const savedComment: Comment = {
            ...response.data,
            User: userContext.user, // assegna manualmente l'utente
          };
          setComments((prevComments) => [...prevComments, savedComment]);
          setComment("");
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  }, [comment, userContext, props.dialogProps.meme?.id]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" } },
        paper: {
          sx: {
            backgroundColor: "#151d26",
            border: "1px solid #798fa6",
            borderRadius: "8px",
            width: "80%",
            maxWidth: "1000px",
            height: "80vh",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "#151d26",
          height: "100%",
          display: "flex",
          gap: 3,
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`http://localhost:3000/${meme?.image}`}
            alt={meme?.title}
            style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ mr: 2 }} />
            <Typography variant="h6">{meme?.title}</Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 2,
              border: "1px solid #798fa6",
              borderRadius: 2,
              padding: 1,
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
                    src={comment.User?.avatarUrl || ""}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Box>
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        mb: 1,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <strong>{comment.User?.userName}</strong>{" "}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "white",
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>

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
