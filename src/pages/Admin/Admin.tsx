import * as React from "react";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main/Main";
import Box from "@mui/material/Box";

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      {/* Only this section changes depending on the route */}
      <Main open={open} />
    </Box>
  );
}
