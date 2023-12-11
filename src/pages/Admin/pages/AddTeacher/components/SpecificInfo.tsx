import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type TeacherInfoProps = {
  title: string;
  list: string[];
};

const SpecificInfo = ({ title, list }: TeacherInfoProps) => {
  const [input, setInput] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value);
  };

  return (
    <FormControl
      sx={{ mt: "26px", width: 200, textOverflow: "ellipsis" }}
      size="small"
    >
      <InputLabel id="select-small-label">{title}</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={input}
        label={title}
        onChange={handleChange}
      >
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

export default SpecificInfo;
