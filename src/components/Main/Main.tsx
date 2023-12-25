import { Route, Routes } from 'react-router-dom';
import { StyledMain } from './styled/StyledMain';
import { TeacherProfile } from '../../pages/Admin/pages/TeacherProfile/TeacherProfile';
import { UsersDataGrid } from '../../pages/Admin/pages/UsersDataGrid/UsersDataGrid';
import Dashboard from '../../pages/Admin/pages/Dashboard/Dashboard';
import UserForm from '../../pages/Admin/pages/UserForm/UserForm';

type Page = {
  link: string;
  element: JSX.Element;
};

const AdminSidebarPages: Page[] = [
  {
    // TODO: this link should be reserved for Homepage (that is for Authentication Page)
    link: '', // Because Dashboard is opened in profile
    element: <Dashboard />,
  },
  
  {
    link: 'add-teacher',
    element: <UserForm />,
  },
  {
    link: 'add-student',
    element: <UserForm />,
  },
];

// TODO: Add links
const TeacherSidebarPages: Page[] = [
  {
    link: '',
    element: <></>,
  },
];

type MainProps = {
  open: boolean;
};

export const Main = ({ open }: MainProps) => {
  return (
    <>
      {/* Without marginTop Header shows on top of Main component */}
      <StyledMain open={open} sx={{ marginTop: '64px' }}>
        {/* TODO: If admin: */}
        <Routes>
          {/* Dashboard, Teacher, Students, Add Teacher */}
          {AdminSidebarPages.map((page, index) => (
            <Route key={index} path={`${page.link}`} element={page.element} />
          ))}

          {/* Dynamic link for teachers */}
          <Route path="/teachers/:id" element={<TeacherProfile />} />

          {/* Edit Profile */}
          <Route path="/edit-profile" element={<UserForm />} />
          <Route path="/teachers/:id/edit" element={<UserForm />} />
        </Routes>

        {/* TODO: If teacher: */}
        <Routes>
          {TeacherSidebarPages.map((page, index) => (
            <Route key={index} path={`${page.link}`} element={page.element} />
          ))}
        </Routes>
      </StyledMain>
    </>
  );
};
