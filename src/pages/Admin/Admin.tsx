import * as React from 'react';
import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import Box from '@mui/material/Box';

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
<<<<<<< HEAD
      <Header open={open} setOpen={setOpen} display="flex" />
      <Sidebar open={open} setOpen={setOpen} admin={true} />
=======
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
>>>>>>> 4661718d05e2ea3e0a41dff28e68a6bf046e163f

      {/* Only this section changes depending on the route */}
      <Main open={open} />
    </Box>
  );
}
