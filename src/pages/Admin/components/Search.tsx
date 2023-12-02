import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search clicked");
  };

  const handleInputClick = () => {
    // Set focus on input when clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputBlur = () => {
    // Remove focus when blurred
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Remove focus when Escape key is pressed
    if (e.key === "Escape" && inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <TextField
        inputRef={inputRef}
        variant="outlined"
        fullWidth
        size="small"
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        InputProps={{
          style: { borderRadius: "25px" }, // Adjust the borderRadius as needed
          startAdornment: (
            <IconButton onClick={handleSearch} size="small">
              <SearchIcon />
            </IconButton>
          ),
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
