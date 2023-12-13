import { Route, Routes } from 'react-router-dom';
import { StyledMain } from './styled/StyledMain';
import AddTeacher from '../../pages/Admin/pages/AddTeacher/AddTeacher';
import Dashboard from '../../pages/Admin/pages/Dashboard/Dashboard';
import EditProfile from '../../pages/Admin/pages/EditProfile/EditProfile';
import Teachers from '../../pages/Admin/pages/Teachers/Teachers';

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
    element: <AddTeacher />,
  },
  {
    link: 'teachers',
    element: <Teachers />,
  },
  {
    link: 'students',
    element: <Teachers />,
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

          {/* Edit Profile */}
          <Route path="/edit-profile" element={<EditProfile />} />
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
