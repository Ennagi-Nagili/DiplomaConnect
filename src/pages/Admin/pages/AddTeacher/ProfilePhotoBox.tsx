// import React from "react";
import { Box } from "@mui/material";
import UploadAvatar from "./UploadAvatar";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProfilePhotoBox = () => {
  // const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("handleChooseFile function is called");

  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     const selectedFile = files[0];
  //     // Implement logic to handle the selected file
  //     console.log("Selected file:", selectedFile);
  //   }
  // };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "14px auto auto auto",
      }}
    >
      {/* ProfilePhoto */}
      <Box
        style={{
          position: "relative",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        <UploadAvatar />
      </Box>

      {/* Choose File */}
      {/* <input
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        id="file-input"
        onChange={handleChooseFile}
      />
      <label htmlFor="file-input">
        <Button
          // This marginBottom is for BasicInfo component to be further apart from this button in AddTeacher page
          sx={{ marginBottom: "16px" }}
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Resume
        </Button>
      </label> */}
    </Box>
  );
};

export default ProfilePhotoBox;
