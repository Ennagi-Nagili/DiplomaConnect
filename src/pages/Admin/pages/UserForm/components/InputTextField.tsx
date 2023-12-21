import { TextField } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';

const user = 'admin';

interface IInputTextField {
  item: TextFieldAttributes;
}

const InputTextField = (props: IInputTextField) => {
  const { item } = props;
  return (
    <TextField
      disabled={user === 'admin' ? false : true}
      sx={{ width: '80%', margin: '0px', marginBottom: '6px' }}
      label={item.label}
      type={item.type}
      variant="outlined"
      fullWidth
      margin="normal"
      required
      // TODO: instead of "Murad", there should be user.ATTR, user data should be fetched when user enters the website
      // Condition should be something like user.ATTR ? user.ATTR : item.value
      value={item.value}
      onChange={item.onChange}
      error={item.error}
      helperText={item.helperText}
      InputProps={item.InputProps}
    />
  );
};

export default InputTextField;
