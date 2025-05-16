import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Avatar,
} from "@mui/material";
import axios from "axios";

interface CommentsProps {
  memeId: number;
}

interface Comment {
  id: number;
  content: string;
  User: {
    id: number;
    username: string;
  };
}

export default function Comments({ memeId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/memes/${memeId}/comments`
      );
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/memes/${memeId}/comments`,
        {
          userId: userId,
          content: newComment,
        }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [memeId]);

  return (
    <Box mt={2}>
      <Stack spacing={2}>
        <TextField
          size="small"
          label="Inserisci un commento..."
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleCommentSubmit}>
          Invia
        </Button>

        <Box>
          {comments.map((comment) => (
            <Box
              key={comment.id}
              mt={1}
              p={1}
              borderBottom={"1px solid #ccc"}
              textAlign={"left"}
            >
              <Avatar></Avatar>
              <Typography variant="body2" fontWeight="bold">
                {comment.User.username}
              </Typography>
              <Typography variant="body2">{comment.content}</Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
