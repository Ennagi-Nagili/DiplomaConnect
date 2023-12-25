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
  const [facultyList, setfacultyList] = useState<[{ id: number; name: string }]>([{ id: 0, name: 'name' }]);
  const [subjectList, setSubjectList] = useState<[{ id: number; name: string }]>([{ id: 0, name: 'name' }]);

  const facultys = {
    title: 'faculty',
    itemList: facultyList,
  };
  const subjects = {
    title: 'Subject',
    itemList: subjectList,
  };

  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set faculties
        const facultiesResponse = await axios.get('https://devedu-az.com:7001/Options/faculty', { headers: { Authorization: `bearer ${token}` } });
        setfacultyList(facultiesResponse.data);
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

  const handlefacultyChange = (event: SelectChangeEvent) => {
    const temporaryfacultyVar = event.target.value;
    const facultyArray = temporaryfacultyVar.split(' ');
    console.log('facultyArray', facultyArray);
    dispatch(setSelectedUser({ ...selectedUser, faculty: { id: +facultyArray[0], name: facultyArray[1] } }));
    console.log('selectedUser', selectedUser);
  };

  const handleSubjectChange = (event: SelectChangeEvent) => {
    const temporarySubjectVar = event.target.value;
    const subjectArray = temporarySubjectVar.split(' ');
    dispatch(setSelectedUser({ ...selectedUser, subjects: [{ id: +subjectArray[0], name: subjectArray[1] }] }));
    console.log('selectedUser', selectedUser);
  };

  return (
    <>
      <FormControl sx={{ width: '80%', textOverflow: 'ellipsis', marginBottom: '26px' }} size="small">
        <InputLabel id="select-small-label">{facultys.title}</InputLabel>
        <Select
          labelId="select-small-label"
          id="select-small"
          value={selectedUser.faculty?.name ? `${selectedUser.faculty?.id} ${selectedUser.faculty?.name}` : ''}
          defaultValue=""
          label={facultys.title}
          onChange={handlefacultyChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {facultyList.map((item, index) => (
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
