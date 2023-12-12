import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { generateNUsers } from "../../../../models/generateMockUsers";
import DataGridToolbar from "../../components/DataGridToolbar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";

// Generating some mock teachers
const teachers = generateNUsers({ type: "teacher", number: 27 });

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 30,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "department",
    headerName: "Department",
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    width: 160,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => [
      <IconButton
        key="delete"
        onClick={() => {
          // Implement delete logic here
          console.log(`Delete row with ID: ${id}`);
        }}
      >
        <DeleteIcon />
      </IconButton>,
    ],
  },
];

export default function DataTable() {
  return (
    <DataGrid
      rows={teachers}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25]}
      pagination
      slots={{
        toolbar: () => <DataGridToolbar />,
      }}
      sx={{
        height: "711px",
        maxHeight: "1000px",
        width: "80%",
        maxWidth: "1000px",
        margin: "auto",
      }}
    />
  );
}
