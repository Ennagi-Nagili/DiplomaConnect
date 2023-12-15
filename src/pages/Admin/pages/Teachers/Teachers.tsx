import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DataGridToolbar from '../../components/DataGridToolbar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useMemo, useState } from 'react';
import { Student, Teacher } from '../../../../models/models';
import { Link } from 'react-router-dom';
import './Teachers.scss';
import { generateNUsers } from '../../../../models/generateMockUsers';

const userType = 'teacher';
const number = 12;

export default function DataTable() {
  // Initial state data
  // TODO:
  // const [users, setUsers] = useState<Teacher[] | Student[]>([]);
  // useEffect(() => {
  //   const fetchUsersArray = async () => {
  //     await fetch(`https://jsonplaceholder.typicode.com/users/${users}`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         const fetchedUsersArray: Teacher[] | Student[] = json;
  //         setUsers(fetchedUsersArray)
  //         console.log('json USERS', json);
  //       });
  //   };
  //   fetchUsersArray();
  // }, []);

  // Temporary initial state data
  const users = generateNUsers({ type: userType, number: number });
  console.log('users', users);

  type Row = (typeof users)[number];
  const [rows, setRows] = useState<Row[]>(users);

  const deleteUser = useCallback(
    (user: Teacher | Student) => () => {
      // TODO: Use real API when available
      console.log(`Delete user with id ${user.id}`);
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'DELETE',
      });
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== user.id));
      });
    },
    [users, rows],
  );

  // Columns:
  const teacherColumns: GridColDef<Row>[] = [
    {
      field: 'department',
      headerName: 'Department',
      width: 140,
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 140,
    },
  ];

  const studentColumns: GridColDef<Row>[] = [
    {
      field: 'group',
      headerName: 'Group',
      width: 140,
    },
  ];

  const columns = useMemo<GridColDef<Row>[]>(
    () => [
      {
        field: 'avatar',
        headerName: '',
        width: 30,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'id',
        headerName: 'ID',
        width: 30,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 200,
        valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
      // Spread teacher or student specific column information
      ...(userType === 'teacher' ? teacherColumns : studentColumns),
      {
        field: 'email',
        headerName: 'Email',
        width: 140,
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 140,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        cellClassName: 'actions',
        getActions: (params) => [
          // Redirect to user
          <>
            {/* // Redirect to user */}
            <Link to={`/admin/teachers/${params.id}`}>
              <GridActionsCellItem key="redirectToUser" icon={<OpenInNewIcon />} label="Redirect" />
            </Link>
            {/* // Delete User */}
            <GridActionsCellItem key="deleteUser" icon={<DeleteIcon />} label="Delete" onClick={deleteUser(params.row)} />
          </>,
        ],
      },
    ],
    [deleteUser],
  );

  return (
    <DataGrid
      rows={rows} // teachers are initial state, rows are secondary
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20]}
      pagination
      slots={{
        toolbar: () => <DataGridToolbar />,
      }}
      sx={{
        // height: '730px',
        // maxHeight: '1000px',
        minWidth: '330px',
        width: '80%',
        maxWidth: '1000px',
        margin: 'auto',
      }}
      autoHeight
      // autoPageSize
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 1 ? 'Mui-even' : 'Mui-odd')}
    />
  );
}
