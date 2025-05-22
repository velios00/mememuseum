import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import Votes from "./Votes";
import Comments from "./Comments";
import { Meme } from "../models/Meme.model";

export default function MemeCard(props: { meme: Meme; memeIndex: number }) {
  console.log("MemeCard", props.meme);
  return (
    <Card
      className="mb-4"
      sx={{
        width: `100%`,
        maxWidth: 600,
        border: "2px solid black",
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
        titleTypographyProps={{
          fontSize: 22,
        }}
        title={props.meme.User?.userName}
        sx={{ pb: 2, color: "white", fontSize: 30 }}
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
        <Votes memeId={props.meme.id} />
        <Comments memeId={props.meme.id} />
      </CardContent>
    </Card>
  );
}
