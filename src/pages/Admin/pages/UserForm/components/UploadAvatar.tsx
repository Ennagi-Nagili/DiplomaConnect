import { Avatar, Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';

const UploadAvatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // console.log(event.target.files?.[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    // Clear the selectedUser profilePhoto url
    dispatch(setSelectedUser({ ...selectedUser, profilePhoto: '' }));
    // Clear the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Clear the preview
    setPreview(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      {/* PROFILE PHOTO */}
      <Avatar src={preview ? preview : selectedUser.profilePhoto} style={{ margin: 10, width: 200, height: 200 }} />

      {/* UPLOAD or CLEAR button under the PROFILE PHOTO */}
      <input accept=".png" id="avatar-upload" type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {preview ? (
          <Button variant="outlined" onClick={handleClear} sx={{ width: 120 }}>
            Clear
          </Button>
        ) : (
          <label htmlFor="avatar-upload">
            <Button component="span" variant="contained" sx={{ width: 160 }}>
              Upload Photo
            </Button>
          </label>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
