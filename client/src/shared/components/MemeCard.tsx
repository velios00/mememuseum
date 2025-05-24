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
import Comments from "./Comments";
import { Meme } from "../models/Meme.model";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { MemeDialog } from "../models/MemeDialog.model";

export default function MemeCard(props: { meme: Meme; memeIndex: number }) {
  if (!props.meme) return null;

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
        <Votes memeId={props.meme.id} votes={props.meme.votes} />
        <IconButton onClick={() => handleOpenModal(props.meme)}>
          <ChatBubbleOutlineIcon sx={{ color: "white" }} />
          <Typography variant="body2" sx={{ color: "white", ml: 0.5 }}>
            {props.meme.comments.lenght}
          </Typography>
        </IconButton>
        {/* <Comments memeId={props.meme.id} comments={props.meme.comments} /> */}
      </CardContent>
    </Card>
  );
}
