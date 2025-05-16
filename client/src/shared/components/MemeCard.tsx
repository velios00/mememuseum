import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Votes from "./Votes";
import Comments from "./Comments";

interface MemeProps {
  id: number;
  title: string;
  image: string;
}

export default function MemeCard({ id, title, image }: MemeProps) {
  console.log("Memecard received id: ", id);
  return (
    <Card className="mb-4">
      <CardMedia
        component={"img"}
        height={"300"}
        image={`http://localhost:3000/${image}`}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Votes memeId={id} />
        <Comments memeId={id} />
      </CardContent>
    </Card>
  );
}
