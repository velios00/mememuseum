import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Avatar,
} from "@mui/material";
import { Comment } from "../models/Comment.model";
import axios from "axios";

export default function Comments(props: {
  memeId: number;
  comments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(props.comments || []);
  const [newComment, setNewComment] = useState("");

  const userId = localStorage.getItem("userId");

  const handleCommentSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/memes/${props.memeId}/comments`,
        {
          userId: userId,
          content: newComment,
        }
      );
      setNewComment("");
      setComments((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Box mt={2}>
      <Stack spacing={2}>
        <TextField
          size="small"
          label="Inserisci un commento..."
          fullWidth
          sx={{
            backgroundColor: "#1e2936",
            color: "white",
            fontWeight: "bold",
          }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ fontWeight: "bold" }}
          onClick={handleCommentSubmit}
        >
          Invia
        </Button>

        <Box>
          {comments.map((comment) => (
            <Box
              key={comment.id}
              mt={1}
              p={1}
              borderBottom={"1px solid #798fa6"}
              textAlign={"left"}
            >
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Avatar sx={{ mt: 0.5 }} />
                <Box sx={{ maxWidth: "100%" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "white", fontSize: 18 }}
                  >
                    {comment.User?.userName}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="normal"
                    sx={{
                      color: "white",
                      fontSize: 16,
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {comment.content}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
