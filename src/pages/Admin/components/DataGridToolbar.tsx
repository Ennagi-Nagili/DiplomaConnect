import { Box, Typography } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const DataGridToolbar = () => {
  return (
    <>
      <Typography variant="h1" fontSize={24} margin={"10px"}>
        Teachers
      </Typography>

      <Box sx={{ display: "flex", margin: "0 15px 0 15px" }}>
        <div>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarFilterButton />
        </div>

        <div style={{ marginLeft: "auto" }}>
          <GridToolbarExport />
        </div>
      </Box>
    </>
  );
};

export default DataGridToolbar;
