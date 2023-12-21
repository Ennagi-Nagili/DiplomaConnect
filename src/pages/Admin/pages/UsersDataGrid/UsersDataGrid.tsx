import './UsersDataGrid.scss';
import { Avatar, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Student, Teacher } from '../../../../models/models';
import { deleteUser, selectStudents, selectTeachers } from '../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import { useCallback } from 'react';
import DataGridToolbar from '../../components/DataGridToolbar';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const UsersDataGrid = () => {
  const dispatch = useAppDispatch();
  const pageMode = window.location.pathname.split('/').pop() as 'teachers' | 'students'; // pop() method removes the last element of the array and returns it

  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);
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

  // Media queries to use in teacher DataGrid
  const isTeacherScreen_1 = useMediaQuery('(max-width: 1255px)');
  const isTeacherScreen_2 = useMediaQuery('(max-width: 1080px)');
  const isTeacherScreen_3 = useMediaQuery('(max-width: 880px)');
  const isTeacherScreen_4 = useMediaQuery('(max-width: 705px)');
  const isTeacherScreen_5 = useMediaQuery('(max-width: 540px)');

  // Columns:
  const columns: GridColDef[] = [
    // Profile Photo
    {
      field: 'avatar',
      headerName: '',
      width: 30,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        console.log('rendering cell');
        return <Avatar src={params.row.profilePhoto} style={{ height: '34px', width: '34px' }} />;
      },
    },
    // ID
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
      headerAlign: 'center',
      align: 'center',
    },
    // Full Name
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: isTeacherScreen_5 ? 170 : 200,
      valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    // Teacher Specific:
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
    // Student Specific:
    {
      field: 'group',
      headerName: 'Group',
      width: 80,
    },
    // Email
    {
      field: 'email',
      headerName: 'Email',
      width: 160,
    },
    // Phone Number
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 140,
    },
    // Actions
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: pageMode === 'teachers' ? 100 : 75,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'actions',
      getActions: (params) => [
        // Redirect to user
        <>
          {/* // Redirect to user */}
          {pageMode === 'teachers' && (
            <Link to={`/admin/teachers/${params.id}`}>
              <GridActionsCellItem key="redirectToUser" icon={<OpenInNewIcon />} label="Redirect" />
            </Link>
          )}
          {/* // Delete User */}
          <GridActionsCellItem key="deleteUser" icon={<DeleteIcon />} label="Delete" onClick={deleteRow(params.row)} />
        </>,
      ],
    },
  ];

  let visibleColumns: GridColDef[] = columns;
  if (pageMode === 'teachers') {
    visibleColumns = visibleColumns.filter((column) => column.field !== 'group');
    if (isTeacherScreen_1) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'phoneNumber');
    }
    if (isTeacherScreen_2) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'email');
    }
    if (isTeacherScreen_3) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'subject');
    }
    if (isTeacherScreen_4) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'department');
    }
    if (isTeacherScreen_5) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'avatar');
    }
  } else if (pageMode === 'students') {
    visibleColumns = visibleColumns.filter((column) => !['department', 'subject'].includes(column.field));
  }

  return (
    <DataGrid
      rows={users} // teachers are initial state, rows are secondary
      columns={visibleColumns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20]}
      pagination
      slots={{
        toolbar: () => <DataGridToolbar />,
      }}
      sx={{
        minWidth: '330px',
        width: '80%',
        maxWidth: pageMode === 'teachers' ? '1000px' : '800px',
        margin: 'auto',
      }}
      autoHeight
      // autoPageSize
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 1 ? 'Mui-even' : 'Mui-odd')}
    />
  );
};
