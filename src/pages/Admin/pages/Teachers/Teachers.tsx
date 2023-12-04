import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { teachers } from "./mockTeachers";
import DataGridToolbar from "../../components/DataGridToolbar";
import { Stack } from "@mui/material";

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
];

export default function DataTable() {
  return (
    <Stack>
      <div
        style={{
          height: "100%",
          width: "80%",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <DataGrid
          rows={teachers}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          // pageSizeOptions={[10, 25]}
          pagination
          slots={{
            toolbar: () => <DataGridToolbar />,
          }}
          checkboxSelection
        />
      </div>
    </Stack>
  );
}
