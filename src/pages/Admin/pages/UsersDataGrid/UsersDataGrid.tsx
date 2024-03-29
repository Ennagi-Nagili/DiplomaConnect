import './UsersDataGrid.scss';
import { Avatar, Snackbar, useMediaQuery } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { deleteUser, selectStudents, selectTeachers } from '../../../../services/reducers/users.slice';
import { Link } from 'react-router-dom';
import { Student, Teacher } from '../../../../models/models';
import { token } from '../../Admin';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import DataGridToolbar from '../../components/DataGridToolbar';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UsersDataGrid = () => {
  const [t, i18] = useTranslation();
  const dispatch = useAppDispatch();
  const pageMode = window.location.pathname.split('/').pop() as 'teachers' | 'students'; // pop() method removes the last element of the array and returns it

  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);

  console.log('teachers', teachers);
  let users = pageMode === 'teachers' ? teachers : students;
  // const users = pageMode === 'teachers' ? teachers : students;
  useEffect(() => {
    users = pageMode === 'teachers' ? teachers : students;
  }, [teachers, students]);

  const deleteRow = useCallback(
    (user: Teacher | Student) => () => {
      const deleteUserApi = (userId: number) => {
        axios
          .delete(`https://devedu-az.com:7001/${pageMode === 'teachers' ? 'Teacher' : 'Student'}/${userId}`, {
            headers: { Authorization: `bearer ${token}` },
          })
          .then((response) => {
            console.log(`${pageMode} deleted successfully:`, response.data);
            dispatch(deleteUser({ userCategory: pageMode, userId }));
            setOpen(true);
          })
          .catch((error) => {
            console.error(`Error deleting ${pageMode}:`, error);
            setErrorOpen(true);
          });
      };

      deleteUserApi(user.id);
    },
    [users, dispatch, pageMode],
  );

  // Media queries to use in teacher DataGrid
  const isTeacherScreen1 = useMediaQuery('(max-width: 1255px)');
  const isTeacherScreen2 = useMediaQuery('(max-width: 1080px)');
  const isTeacherScreen3 = useMediaQuery('(max-width: 880px)');
  const isTeacherScreen4 = useMediaQuery('(max-width: 705px)');
  const isTeacherScreen5 = useMediaQuery('(max-width: 540px)');

  // Media queries to use in student DataGrid
  const isStudentScreen1 = useMediaQuery('(max-width: 1000px)');
  const isStudentScreen2 = useMediaQuery('(max-width: 710px)');
  const isStudentScreen3 = useMediaQuery('(max-width: 585px)');
  const isStudentScreen4 = useMediaQuery('(max-width: 485px)');

  type subjectItem = {
    id: number;
    name: string;
  };

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
      headerName: t('Full name'),
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: isTeacherScreen5 ? 170 : 200,
      valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    // Teacher Specific:
    {
      field: 'faculty',
      headerName: t('Faculty'),
      width: 140,
      valueGetter: (params: GridValueGetterParams) => (`${params.row.faculty?.id}` ? `${params.row.faculty?.name}` : ''),
    },
    {
      field: 'subject',
      headerName: t('Subject'),
      width: 140,
      // valueGetter: (params: GridValueGetterParams) => (`${params.row.subject?.id}` ? `${params.row.subject?.name}` : ''),
      valueGetter: (params: GridValueGetterParams) => params.row.subjects?.[0]?.name,
    },
    // Student Specific:
    {
      field: 'groupNumber',
      headerName: t('Group'),
      width: 80,
    },
    // Email
    {
      field: 'email',
      headerName: t('Email'),
      width: 160,
    },
    // Phone Number
    {
      field: 'phoneNumber',
      headerName: t('Phone Number'),
      width: 140,
    },
    // Actions
    {
      field: 'actions',
      type: 'actions',
      headerName: t('Actions'),
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
    visibleColumns = visibleColumns.filter((column) => column.field !== 'groupNumber');
    if (isTeacherScreen1) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'phoneNumber');
    }
    if (isTeacherScreen2) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'email');
    }
    if (isTeacherScreen3) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'subject');
    }
    if (isTeacherScreen4) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'faculty');
    }
    if (isTeacherScreen5) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'avatar');
    }
  } else if (pageMode === 'students') {
    visibleColumns = visibleColumns.filter((column) => !['faculty', 'subject'].includes(column.field));
    if (isStudentScreen1) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'phoneNumber');
    }
    if (isStudentScreen2) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'email');
    }
    if (isStudentScreen3) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'groupNumber');
    }
    if (isStudentScreen4) {
      visibleColumns = visibleColumns.filter((column) => column.field !== 'avatar');
    }
  }

  // SnackBar
  const [open, setOpen] = useState(false);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleErrorClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  const [errorOpen, setErrorOpen] = useState(false);

  return (
    <>
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
          maxWidth: pageMode === 'teachers' ? '1000px' : '780px',
          margin: 'auto',
        }}
        autoHeight
        // autoPageSize
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 1 ? 'Mui-even' : 'Mui-odd')}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {t('The user is successfully deleted'!)}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          {t('There was an error when deleting user'!)}
        </Alert>
      </Snackbar>
    </>
  );
};
