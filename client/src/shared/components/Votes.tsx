import { useCallback, useEffect, useState } from "react";
import ThumbsUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbsDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { IconButton, keyframes, Typography } from "@mui/material";
import axios from "axios";
import { deleteVote, saveVote, updateVote } from "../../services/VoteService";

export default function Votes(props: { memeId: number; votes: any[] }) {
  const [vote, setVote] = useState<1 | -1 | 0>(0);
  const [voteCount, setVoteCount] = useState(0);
  const [voteId, setVoteId] = useState<number | null>(null); // serve per put e delete

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!props.votes) return;
    const userVote = props.votes.find((v) => v.userId.toString() === userId);
    const total = props.votes.reduce((sum, v) => sum + v.value, 0);

    if (userVote) {
      setVote(userVote.value);
      setVoteId(userVote.id);
    }
    setVoteCount(total);
  }, [props.votes, userId]);

  const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

  const handleVote = useCallback(
    async (newValue: 1 | -1) => {
      try {
        if (vote === newValue) {
          await deleteVote(props.memeId, voteId!);
          setVote(0);
          setVoteCount((prev) => prev - newValue);
          setVoteId(null);
        } else if (vote === 0) {
          const res = await saveVote(props.memeId, userId!, newValue);
          setVote(newValue);
          setVoteCount((prev) => prev + newValue);
          setVoteId(res.data.id);
        } else {
          await updateVote(voteId!, userId!, newValue);
          setVoteCount((prev) => prev + newValue - vote);
          setVote(newValue);
        }
      } catch (error) {
        console.error("Errore nel voto", error);
      }
    },
    [vote, voteId, userId, props.memeId]
  );

  return (
    <>
      <IconButton
        onClick={() => handleVote(1)}
        sx={{
          "&:hover": {
            animation: `${pulse} 1s infinite`,
          },
        }}
      >
        {vote === 1 ? (
          <ThumbsUpIcon sx={{ color: "#4CAF50" }} />
        ) : (
          <ThumbsUpOutlinedIcon sx={{ color: "white" }} />
        )}
      </IconButton>

      <Typography variant="body1" sx={{ color: "white", mx: 1 }}>
        {voteCount}
      </Typography>

      <IconButton
        onClick={() => handleVote(-1)}
        sx={{
          "&:hover": {
            animation: `${pulse} 1s infinite`,
          },
        }}
      >
        {vote === -1 ? (
          <ThumbsDownIcon sx={{ color: "#F44336" }} />
        ) : (
          <ThumbDownOffAltOutlinedIcon sx={{ color: "white" }} />
        )}
      </IconButton>
    </>
  );
}
