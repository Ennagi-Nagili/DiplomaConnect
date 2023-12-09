// JUST EXPERIMENTING... IGNORE THIS FILE.

import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Autocomplete, Box, Drawer, createFilterOptions } from "@mui/material";

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 750px)");

  // This functionality is for mobile version
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search clicked");
    setIsSearchClicked(true);
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

  //
  const filterOptions = createFilterOptions({
    ignoreCase: true,
    limit: 6,
    trim: true,
  });

  // TODO: This is just an example with jsonplacholder.
  // Adapt the type after API is created.
  type UserObject = {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: object;
    phone: string;
    website: string;
    company?: object;
  };

  const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json: UserObject[]) => {
        const names = json.map((user) => user.name);
        // console.log(names);
        setUserNames(names);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isSmallScreen ? "flex-end" : "center",
        margin: "auto",
      }}
    >
      {/* TODO */}
      {isSmallScreen ? (
        <IconButton onClick={handleSearch} size="small">
          <SearchIcon color="primary" />
        </IconButton>
      ) : (
        <>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            // TODO: Use data from real API instead of jsonplaceholder
            options={userNames}
            style={{ width: "30%", minWidth: "400px" }}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                variant="outlined"
                fullWidth
                size="small"
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                InputProps={{
                  ...params.InputProps,
                  style: { borderRadius: "25px" }, // Adjust the borderRadius as needed
                  type: "search",
                  startAdornment: (
                    <IconButton onClick={handleSearch} size="small">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                placeholder="Search for users..."
              />
            )}
          />
        </>
      )}

      {/* Top Drawer when search icon button in mobile is clicked */}
      <Drawer
        anchor={"top"}
        open={isSearchClicked}
        onClose={() => setIsSearchClicked(false)}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "64px",
          }}
        >
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            // TODO: Use data from real API instead of jsonplaceholder
            options={userNames}
            style={{ width: "30%", minWidth: "400px", margin: "auto", marginTop: "9px" }}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                variant="outlined"
                fullWidth
                size="small"
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                InputProps={{
                  ...params.InputProps,
                  style: { borderRadius: "25px" }, // Adjust the borderRadius as needed
                  type: "search",
                  startAdornment: (
                    <IconButton onClick={handleSearch} size="small">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                placeholder="Search for users..."
              />
            )}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default SearchBar;
