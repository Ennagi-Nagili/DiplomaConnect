/* eslint-disable jsx-a11y/label-has-associated-control */
import { Avatar, Button, IconButton } from '@mui/material';
import React, { useState } from 'react';

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input accept=".png" id="avatar-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
      <label>
        <IconButton component="span" color="primary">
          <Avatar src={preview ? preview : ''} style={{ margin: 10, width: 200, height: 200 }} />
        </IconButton>
      </label>

      {preview && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleClear} sx={{ width: 120 }}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
