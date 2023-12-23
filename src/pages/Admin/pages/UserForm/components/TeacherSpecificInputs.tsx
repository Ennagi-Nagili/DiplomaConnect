import { Teacher } from '../../../../../models/models';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { token } from '../../../Admin';

const TeacherSpecificInputs = () => {
  const [departmentList, setDepartmentList] = useState<string[]>([]);
  const [subjectList, setSubjectList] = useState<string[]>([]);

  const departments = {
    title: 'Department',
    itemList: departmentList,
  };
  const subjects = {
    title: 'Subject',
    itemList: subjectList,
  };

  type itemObject = {
    id: number;
    name: string;
  };

  useEffect(() => {
    axios
      .get('https://devedu-az.com:7001/Options/faculty', { headers: { Authorization: `bearer ${token}` } })
      .then((response: AxiosResponse<itemObject[]>) => {
        const faculties = response.data.map((item) => item.name);
        setDepartmentList(faculties);
        console.log('faculties', faculties);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching faculties:', error);
      });
    axios
      .get('https://devedu-az.com:7001/Options/subject', { headers: { Authorization: `bearer ${token}` } })
      .then((response: AxiosResponse<itemObject[]>) => {
        const subjects = response.data.map((item) => item.name);
        setSubjectList(subjects);
        console.log('subjects', subjects);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching faculties:', error);
      });
  }, [window.location.pathname]);

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
