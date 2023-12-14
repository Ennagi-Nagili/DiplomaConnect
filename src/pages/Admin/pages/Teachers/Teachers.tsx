import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { generateNUsers } from '../../../../models/generateMockUsers';
import DataGridToolbar from '../../components/DataGridToolbar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useCallback, useMemo, useState } from 'react';
import { Student, Teacher } from '../../../../models/models';
import { useNavigate } from 'react-router-dom';

// Rows:
// Initial state of teachers
const teachers: Teacher[] = generateNUsers({ type: 'teacher', number: 27 }); // Generating some mock teachers

// Actions (will be used 'actions' column)
type Row = (typeof teachers)[number];

export default function DataTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<Row[]>(teachers);

  const openUserProfile = useCallback(
    (user: Teacher | Student) => () => {
      // setTimeout(() => {
      //   setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      // });
      console.log(`Open user with id ${user.id}`);
      navigate(`/teacher/${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}-id${user.id}`);
    },
    [],
  );

  const deleteUser = useCallback(
    (user: Teacher | Student) => () => {
      console.log(`Delete user with id ${user.id}`);
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== user.id));
      });
    },
    [],
  );

  // Columns:
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
          <GridActionsCellItem icon={<OpenInNewIcon />} label="Redirect" onClick={openUserProfile(params.row)} />,

          // Delete User
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={deleteUser(params.row)} />,
        ],
      },
    ],
    [deleteUser],
  );

  return (
    <DataGrid
      rows={rows} // tachers are initial state, rows are secondary
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
        width: '80%',
        maxWidth: '1000px',
        margin: 'auto',
      }}
    />
  );
}
