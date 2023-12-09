import { Dialog } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  image: string;
}

export const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <img src={props.image} alt="" />
    </Dialog>
  );
};
