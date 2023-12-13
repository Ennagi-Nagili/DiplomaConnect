import { Divider, List, ListSubheader } from '@mui/material';
import { Person, School } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AddTeacher from '../../pages/Admin/pages/AddTeacher/AddTeacher';
import BarChartIcon from '@mui/icons-material/BarChart';
import Dashboard from '../../pages/Admin/pages/Dashboard/Dashboard';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';
import Teachers from '../../pages/Admin/pages/Teachers/Teachers';

type AdminSidebarContentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminSidebarContent: React.FC<AdminSidebarContentProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  // Add types if needed
  const listContent = [
    {
      subheader: 'Dashboard',
      content: [
        {
          id: 1,
          title: 'Dashboard',
          link: '', // Because Dashboard is opened in profile [Note: this link is "/profile"]
          icon: <BarChartIcon />,
          element: <Dashboard />,
        },
      ],
    },
    {
      subheader: 'Users',
      content: [
        {
          id: 2,
          title: 'Teachers',
          link: 'teachers',
          icon: <Person />,
          element: <Teachers />,
        },
        {
          id: 3,
          title: 'Students',
          link: 'students',
          icon: <School />,
          element: <Teachers />,
        },
      ],
    },
    {
      subheader: 'Add User',
      content: [
        {
          id: 4,
          title: 'Add Teacher',
          link: 'add-teacher',
          icon: <PersonAddIcon />,
          element: <AddTeacher />,
        },
        {
          id: 5,
          title: 'Add Student',
          link: 'add-student',
          icon: <PersonAddIcon />,
          element: <AddTeacher />,
        },
      ],
    },
  ];

  return (
    <>
      {listContent.map((list, index) => (
        <div key={index}>
          <Divider />
          <List subheader={<ListSubheader style={{ height: '40px' }}>{list.subheader}</ListSubheader>}>
            {list.content.map((listItem, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  navigate(`/admin/${listItem.link}`);
                  setOpen(false); // Close the drawer on item click
                }}
              >
                <ListItemButton selected={window.location.pathname === `/admin/${listItem.link}`}>
                  <ListItemIcon>{listItem.icon}</ListItemIcon>
                  <ListItemText primary={listItem.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </>
  );
};

export default AdminSidebarContent;
