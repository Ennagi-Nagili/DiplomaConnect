import { Student } from '../../../../../models/models';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

const StudentSpecificInputs = () => {
  const [t, i18] = useTranslation();
  // TODO: This info needs to come from backend
  // Note: Each item in itemList should be an array of objects
  const groups = {
    title: t('Group'),
    itemList: ['R-11', 'RM-23', 'M-65'],
  };

  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser) as Student;

  const handleGroupChange = (event: SelectChangeEvent) => {
    const temporaryGroupVar = event.target.value;
    dispatch(setSelectedUser({ ...selectedUser, groupNumber: temporaryGroupVar }));
  };

  return (
    <>
      <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
        <InputLabel id="select-small-label">{groups.title}</InputLabel>
        <Select
          labelId="select-small-label"
          id="select-small"
          value={selectedUser.groupNumber ? selectedUser.groupNumber : ''}
          label={groups.title}
          onChange={handleGroupChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {groups.itemList.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default StudentSpecificInputs;
