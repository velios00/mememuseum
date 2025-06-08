import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Box,
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
    props.meme?.comments.length
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
        mx: "auto",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          cursor: "pointer",
        }}
        onClick={() => navigate(`/profile/${props.meme.User?.id}`)}
      >
        <Avatar
          src={`http://localhost:3000/${props.meme.User?.profileImage || ""}`}
          alt={props.meme.User?.userName}
          sx={{ width: 40, height: 40, mr: 1 }}
        />
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          {props.meme.User?.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",

          aspectRatio: "1/1",
        }}
      >
        <CardMedia
          component={"img"}
          height={"300"}
          image={`http://localhost:3000/${props.meme.image}`}
          alt={props.meme.title}
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            objectPosition: "cover",
          }}
        />
      </Box>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          {props.meme.title}
        </Typography>
        {props.meme.tags && props.meme.tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ flexWrap: "wrap", mt: 1, px: { xs: 0.5, sm: 1 } }}
          >
            {props.meme.tags.map((tag, index) => (
              <Chip
                sx={{
                  backgroundColor: "#1e2936",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  height: { xs: 24, sm: 32 },
                }}
                key={index}
                label={`#${tag}`}
                variant="outlined"
                size="medium"
              />
            ))}
          </Stack>
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 0.5, sm: 2 }}
          mt={2}
        >
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
