import { useState, KeyboardEvent } from "react";
import { TagSearchBarProps } from "../models/TagSearchBarProps.model";
import { Box, Chip, TextField } from "@mui/material";

export default function TagSearchBar({ tags, setTags }: TagSearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Box className="w-full flex flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => handleDelete(tag)}
          sx={{ backgroundColor: "#1e2936", color: "white" }}
        />
      ))}
      <TextField
        variant="standard"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Aggiungi un tag e invia"
        InputProps={{
          disableUnderline: true,
          style: { color: "white", minWidth: "120px" },
        }}
        sx={{ backgroundColor: "transparent", color: "white" }}
      />
    </Box>
  );
}
