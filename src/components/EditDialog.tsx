import { Dialog } from '@mui/material';
import React from 'react';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  item: string;
  index: number;
  text: string;
  onEdit: (item: string, value: string, index: number) => void;
}

export const EditDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open, onEdit, item, index, text } = props;

  const [value, setValue] = React.useState('');

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleEdit = () => {
    onEdit(item, value, index);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="input-container">
        <input
          type="text"
          className="edit-input"
          defaultValue={text}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button
          className="submit-btn"
          onClick={() => {
            handleEdit();
            handleClose();
          }}
        >
          Submit
        </button>
      </div>
    </Dialog>
  );
};
