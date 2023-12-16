import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DataGridToolbar from '../../components/DataGridToolbar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useEffect, useMemo } from 'react';
import { Student, Teacher } from '../../../../models/models';
import { Link } from 'react-router-dom';
import './Teachers.scss';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import { deleteUser, selectStudents, selectTeachers } from '../../../../services/reducers/users.slice';

export default function DataTable() {
  const dispatch = useAppDispatch();
  const pageMode = window.location.pathname.split('/').pop() as 'teachers' | 'students'; // pop() method removes the last element of the array and returns it
  console.log(pageMode);

  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);

  useEffect(() => {
    if (pageMode === 'teachers') {
      const users = teachers;
      console.log('users', users);
    } else if (pageMode === 'students') {
      const users = students;
      console.log('users', users);
    }
  }, [pageMode]);

  const users = pageMode === 'teachers' ? teachers : students;

  const deleteRow = useCallback(
    (user: Teacher | Student) => () => {
      // TODO: Use real API when available
      console.log(`Delete user with id ${user.id}`);
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'DELETE',
      }).then((_) => dispatch(deleteUser({ userCategory: pageMode, userId: user.id })));
    },
    [users],
  );

  // Columns:
  const teacherColumns: GridColDef[] = [
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

  const studentColumns: GridColDef[] = [
    {
      field: 'group',
      headerName: 'Group',
      width: 140,
    },
  ];

  const columns = useMemo<GridColDef[]>(
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
      ...(pageMode === 'teachers' ? teacherColumns : studentColumns),
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
            <GridActionsCellItem key="deleteUser" icon={<DeleteIcon />} label="Delete" onClick={deleteRow(params.row)} />
          </>,
        ],
      },
    ],
    [deleteRow, pageMode],
  );

  return (
    <DataGrid
      rows={users} // teachers are initial state, rows are secondary
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
