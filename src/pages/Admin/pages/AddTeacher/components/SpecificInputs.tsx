import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type TeacherInfoProps = {
  title: string;
  list: string[];
};

const SpecificInputs = ({ title, list }: TeacherInfoProps) => {
  const [input, setInput] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value);
  };

  return (
    <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
      <InputLabel id="select-small-label">{title}</InputLabel>
      <Select labelId="select-small-label" id="select-small" value={input} label={title} onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SpecificInputs;
