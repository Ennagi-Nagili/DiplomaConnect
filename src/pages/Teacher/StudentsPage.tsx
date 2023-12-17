import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { StudentTable } from '../../components/customTable/tables/StudentTable';
import React from 'react';

export const StudentsPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Header open={open} setOpen={setOpen} display="none" />
      <Sidebar open={open} setOpen={setOpen} admin={false} />

      <div className="table-container">
        <StudentTable type={'student'} />
      </div>
    </div>
  );
};
