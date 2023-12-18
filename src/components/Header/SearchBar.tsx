import { Autocomplete, createFilterOptions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppSelector } from '../../services/hooks';
import { selectStudents, selectTeachers } from '../../services/reducers/users.slice';

// TODO: This is just an example with jsonplacholder.
// Adapt the type after API is created.
export type UserObject = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: object;
  phone: string;
  website: string;
  company?: object;
};

const SearchBar: React.FC = () => {
  const teacherNames = useAppSelector(selectTeachers).map(
    (item) => `${item.id} ${item.firstName} ${item.lastName} ${item.fatherName} (${item.type})`,
  );
  const studentNames = useAppSelector(selectStudents).map(
    (item) => `${item.id} ${item.firstName} ${item.lastName} ${item.fatherName} (${item.type})`,
  );
  // console.log('teacherNames', teacherNames);
  const userNames = teacherNames.concat(studentNames);
  // console.log('userNames', userNames);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSmallScreen = useMediaQuery('(max-width: 750px)');

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search clicked');
  };

  const handleInputClick = () => {
    // Set focus on input when clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputBlur = () => {
    // Remove focus when blurred
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Remove focus when Escape key is pressed
    if (e.key === 'Escape' && inputRef.current) {
      inputRef.current.blur();
    }
  };

  //
  const filterOptions = createFilterOptions({
    ignoreCase: true,
    limit: 6,
    trim: true,
  });

  // const [userNames, setUserNames] = useState<string[]>([]);

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((json: UserObject[]) => {
  //       const names = json.map((user) => user.name);
  //       // console.log(names);
  //       setUserNames(names);
  //     });
  // }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isSmallScreen ? 'flex-end' : 'center',
        margin: 'auto',
      }}
    >
      {/* TODO */}
      {isSmallScreen ? (
        <IconButton onClick={handleSearch} size="small">
          <SearchIcon color="primary" />
        </IconButton>
      ) : (
        <>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            // TODO: Use data from real API instead of jsonplaceholder
            options={userNames}
            style={{ width: '30%', minWidth: '400px' }}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                variant="outlined"
                fullWidth
                size="small"
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                InputProps={{
                  ...params.InputProps,
                  style: { borderRadius: '25px' }, // Adjust the borderRadius as needed
                  type: 'search',
                  startAdornment: (
                    <IconButton onClick={handleSearch} size="small">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
                placeholder="Search for users..."
              />
            )}
          />
        </>
      )}
    </div>
  );
};

export default SearchBar;
