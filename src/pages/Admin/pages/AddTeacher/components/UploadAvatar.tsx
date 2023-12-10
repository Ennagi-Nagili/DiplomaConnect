import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";

const UploadAvatar: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* PROFILE PHOTO */}
      <Avatar
        src={preview ? preview : ""}
        style={{ margin: 10, width: 200, height: 200 }}
      />

      {/* UPLOAD or CLEAR button under the PROFILE PHOTO */}
      <input
        accept=".png"
        id="avatar-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        {preview ? (
          <Button variant="outlined" onClick={handleClear} sx={{ width: 120 }}>
            Clear
          </Button>
        ) : (
          <label htmlFor="avatar-upload">
            <Button
              component="span"
              variant="contained"
              onClick={handleClear}
              sx={{ width: 160 }}
            >
              Upload Photo
            </Button>
          </label>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
