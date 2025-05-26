import { useEffect, useState } from "react";
import ThumbsUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";

export default function Votes(props: { memeId: number; votes: any[] }) {
  const [vote, setVote] = useState<1 | -1 | 0>(0);
  const [voteCount, setVoteCount] = useState(0);
  const [voteId, setVoteId] = useState<number | null>(null); // serve per put e delete

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const userVote = props.votes.find((v) => v.userId.toString() === userId);
    const total = props.votes.reduce((sum, v) => sum + v.value, 0);

    if (userVote) {
      setVote(userVote.value);
      setVoteId(userVote.id);
    }
    setVoteCount(total);
  }, [props.votes, userId]);

  const handleVote = async (newValue: 1 | -1) => {
    try {
      if (vote === newValue) {
        await axios.delete(
          `http://localhost:3000/memes/${props.memeId}/votes/${voteId}`
        );
        setVote(0);
        setVoteCount((prevCount) => prevCount - newValue);
        setVoteId(null);
      } else if (vote === 0) {
        //nuovo voto
        const res = await axios.post(
          `http://localhost:3000/memes/${props.memeId}/votes`,
          {
            userId: userId,
            value: newValue,
          }
        );
        setVote(newValue);
        setVoteCount((prevCount) => prevCount + newValue);
        setVoteId(res.data.id);
      } else {
        //cambio voto
        await axios.put(`http://localhost:3000/memes/votes/${voteId}`, {
          userId: userId,
          value: newValue,
        });
        setVoteCount((prevCount) => prevCount + newValue - vote);
        setVote(newValue);
      }
    } catch (error) {
      console.error("Error handling vote:", error);
    }
  };

  return (
    <>
      <IconButton onClick={() => handleVote(1)}>
        <ThumbsUpIcon sx={{ color: "white" }} />
      </IconButton>
      <Typography variant="body1" sx={{ color: "white" }}>
        {voteCount}
      </Typography>
      <IconButton onClick={() => handleVote(-1)}>
        <ThumbsDownIcon sx={{ color: "white" }} />
      </IconButton>
    </>
  );
}
