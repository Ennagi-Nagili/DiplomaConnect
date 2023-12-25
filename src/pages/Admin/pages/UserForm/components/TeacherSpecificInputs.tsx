import { Teacher } from '../../../../../models/models';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../../../Admin';
import axiosRetry from 'axios-retry';

const TeacherSpecificInputs = () => {
  const [departmentList, setDepartmentList] = useState<[{ id: number; name: string }]>([{ id: 0, name: 'name' }]);
  const [subjectList, setSubjectList] = useState<[{ id: number; name: string }]>([{ id: 0, name: 'name' }]);

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
        setDepartmentList(facultiesResponse.data);
        console.log('facultiesResponse.data', facultiesResponse.data);
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
        setSubjectList(subjectsResponse.data);
        console.log('subjectsResponse.data', subjectsResponse.data);
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
    const departmentArray = temporaryDepartmentVar.split(' ');
    console.log('departmentArray', departmentArray);
    dispatch(setSelectedUser({ ...selectedUser, faculty: { id: +departmentArray[0], name: departmentArray[1] } }));
    console.log('selectedUser', selectedUser);
  };

  const handleSubjectChange = (event: SelectChangeEvent) => {
    const temporarySubjectVar = event.target.value;
    const subjectArray = temporarySubjectVar.split(' ');
    dispatch(setSelectedUser({ ...selectedUser, subject: [{ id: +subjectArray[0], name: subjectArray[1] }] }));
    console.log('selectedUser', selectedUser);
  };

  // const departmentsMenuItems = departmentList?.map((item) => `${item.id} ${item.name}`);
  // const subjectsMenuItems = subjectList?.map((item) => `${item[0].id} ${item[0].name}`);

  return (
    <>
      <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
        <InputLabel id="select-small-label">{departments.title}</InputLabel>
        <Select
          labelId="select-small-label"
          id="select-small"
          value={selectedUser.faculty?.name ? `${selectedUser.faculty?.id} ${selectedUser.faculty?.name}` : ''}
          defaultValue=""
          label={departments.title}
          onChange={handleDepartmentChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departmentList.map((item, index) => (
            <MenuItem value={`${item.id} ${item.name}`} key={index}>
              {item.id} {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
        <InputLabel id="select-small-label">{subjects.title}</InputLabel>
        <Select
          labelId="select-small-label"
          id="select-small"
          // value={selectedUser.subject ? (selectedUser.subject[0] ? `${selectedUser.subject[0].id} ${selectedUser.subject[0]?.name}` : '') : ''}
          defaultValue=""
          label={subjects.title}
          onChange={handleSubjectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {subjectList.map((item, index) => (
            <MenuItem value={`${item.id} ${item.name}`} key={index}>
              {item.id} {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default TeacherSpecificInputs;
