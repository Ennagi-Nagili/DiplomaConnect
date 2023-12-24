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
import axiosRetry from 'axios-retry';

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

  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set faculties
        const facultiesResponse = await axios.get('https://devedu-az.com:7001/Options/faculty', { headers: { Authorization: `bearer ${token}` } });
        const faculties = facultiesResponse.data.map((item: itemObject) => item.name);
        setDepartmentList(faculties);
        console.log('faculties', faculties);
      } catch (error: any) {
        if (axiosRetry.isNetworkError(error) || (error.response && error.response.status === 500)) {
          console.error('Error fetching faculties. Retrying...');
          throw error; // This will trigger the retry
        } else {
          console.error('Error fetching faculties:', error);
        }
      }

      try {
        // Set subjects
        const subjectsResponse = await axios.get('https://devedu-az.com:7001/Options/subject', { headers: { Authorization: `bearer ${token}` } });
        const subjects = subjectsResponse.data.map((item: itemObject) => item.name);
        setSubjectList(subjects);
        console.log('subjects', subjects);
      } catch (error: any) {
        if (axiosRetry.isNetworkError(error) || (error.response && error.response.status === 500)) {
          console.error('Error fetching subjects. Retrying...');
          throw error; // This will trigger the retry
        } else {
          console.error('Error fetching subjects:', error);
        }
      }
    };

    fetchData();
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
