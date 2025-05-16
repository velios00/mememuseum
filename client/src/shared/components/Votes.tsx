import { useEffect, useState } from "react";
import ThumbsUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";

interface voteControlProps {
  memeId: number;
}

export default function Votes({ memeId }: voteControlProps) {
  const [vote, setVote] = useState<1 | -1 | 0>(0);
  const [voteCount, setVoteCount] = useState(0);
  const [voteId, setVoteId] = useState<number | null>(null); // serve per put e delete
  const [userVote, setUserVote] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/memes/${memeId}/votes`
        );
        const allVotes = res.data.votes;
        const userVote = allVotes.find((vote: any) => vote.userId === userId);
        if (userVote) {
          setVote(userVote.vote);
          setVoteId(userVote.id);
        }

        const total = allVotes.reduce(
          //reduce server a sommare i voti
          (sum: number, vote: any) => sum + vote.value,
          0
        );
        setVoteCount(total);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    fetchVotes();
  }, [memeId]);

  const handleVote = async (newValue: 1 | -1) => {
    try {
      if (vote === newValue) {
        await axios.delete(
          `http://localhost:3000/memes/${memeId}/votes/${voteId}`
        );
        setVote(0);
        setVoteCount((prevCount) => prevCount - newValue);
        setVoteId(null);
      } else if (vote === 0) {
        //nuovo voto
        const res = await axios.post(
          `http://localhost:3000/memes/${memeId}/votes`,
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
    <Stack direction="row" alignItems="center" spacing={1} mt={2}>
      <IconButton onClick={() => handleVote(1)}>
        <ThumbsUpIcon color="primary" />
      </IconButton>
      <Typography variant="body1">{voteCount}</Typography>
      <IconButton onClick={() => handleVote(-1)}>
        <ThumbsDownIcon color="error" />
      </IconButton>
    </Stack>
  );
}
