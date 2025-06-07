import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import Votes from "./Votes";
import { Meme } from "../models/Meme.model";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MemeDialog from "./memeDialog";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export default function MemeCard(props: { meme: Meme; memeIndex: number }) {
  if (!props.meme) return null;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [commentsCount, setCommentsCount] = useState(
    props.meme.comments.length
  );

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Card
      className="mb-4"
      sx={{
        width: `100%`,
        maxWidth: 600,
        border: "1px solid black",
        borderColor: "#798fa6",
        borderRadius: "8px",
        backgroundColor: "#151d26",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:3000/${props.meme.User?.profileImage || ""}`}
            alt={props.meme.User?.userName}
            onClick={() => navigate(`/profile/${props.meme.User?.id}`)}
          />
        }
        slotProps={{
          title: { color: "white", fontSize: 22, fontWeight: "semibold" },
        }}
        title={props.meme.User?.userName}
        sx={{ pb: 2, color: "white" }}
      />
      <CardMedia
        component={"img"}
        height={"300"}
        image={`http://localhost:3000/${props.meme.image}`}
        alt={props.meme.title}
        sx={{ height: 800, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          {props.meme.title}
        </Typography>
        {props.meme.tags && props.meme.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
            {props.meme.tags.map((tag, index) => (
              <Chip
                sx={{
                  backgroundColor: "#1e2936",
                  color: "white",
                  fontWeight: "bold",
                }}
                key={index}
                label={`#${tag}`}
                variant="outlined"
                size="medium"
              />
            ))}
          </Stack>
        )}
        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <Votes memeId={props.meme.id} votes={props.meme.votes} />
          <IconButton onClick={handleOpenModal}>
            <ChatBubbleOutlineIcon sx={{ color: "white" }} />
            <Typography variant="body2" sx={{ color: "white", ml: 0.5 }}>
              {commentsCount}
            </Typography>
          </IconButton>
        </Stack>
        <MemeDialog
          dialogProps={{
            open: open,
            meme: props.meme,
            onClose: handleCloseModal,
            onNewComment: () => setCommentsCount((prev) => prev + 1),
          }}
        />
      </CardContent>
    </Card>
  );
}
