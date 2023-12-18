import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { Teacher } from '../../../../../models/models';

// TODO: This info needs to come from backend
// Note: Each item in itemList should be an array of objects
const departments = {
  title: 'Department',
  itemList: ['Analysis', 'Algebra and Geometry', 'Differential and Integral Equations'],
};
const subjects = {
  title: 'Subject',
  itemList: ['Real Analysis', 'Complex Analysis', 'Group Theory'],
};

const TeacherSpecificInputs = () => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser) as Teacher;

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    const temporaryDepartmentVar = event.target.value;
    dispatch(setSelectedUser({ ...selectedUser, department: temporaryDepartmentVar }));
  };

  const handleSubjectChange = (event: SelectChangeEvent) => {
    const temporarySubjectVar = event.target.value;
    dispatch(setSelectedUser({ ...selectedUser, subject: temporarySubjectVar }));
  };

  return (
    <>
      <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
        <InputLabel id="select-small-label">{departments.title}</InputLabel>
        <Select
          labelId="select-small-label"
          id="select-small"
          value={selectedUser.department ? selectedUser.department : ''} // when selectedUser.department is undefined, nothing is chosen
          label={departments.title}
          onChange={handleDepartmentChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departments.itemList.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
        <InputLabel id="select-small-label">{subjects.title}</InputLabel>
        <Select
          labelId="select-small-label"
          id="select-small"
          value={selectedUser.subject ? selectedUser.subject : ''} // when selectedUser.department is undefined, nothing is chosen
          label={subjects.title}
          onChange={handleSubjectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {subjects.itemList.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default TeacherSpecificInputs;
