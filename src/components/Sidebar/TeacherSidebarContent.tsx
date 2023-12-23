import '../../style/ProfilePage.scss';
import { Button, Divider, List, ListSubheader } from '@mui/material';
import { redirect, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Cookies from 'universal-cookie';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';

type TeacherSidebarContentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeacherSidebarContent: React.FC<TeacherSidebarContentProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  // Add types if needed
  const listContent = {
    subheader: 'Navigation',
    content: [
      {
        id: 1,
        title: 'Requests',
        link: '/requests',
        icon: <CheckCircleOutlineIcon />,
      },

      {
        id: 1,
        title: 'My Students',
        link: '/students',
        icon: <PeopleIcon />,
      },
    ],
  };

  function handleLogout() {
    const cookie = new Cookies();
    cookie.remove('token');
    cookie.remove('id');
    cookie.remove('mail');
    cookie.remove('password');
    navigate('/login');
    console.log('salam');
  }

  return (
    <>
      <div>
        <Divider />
        <List subheader={<ListSubheader style={{ height: '40px' }}>{listContent.subheader}</ListSubheader>}>
          {listContent.content.map((listItem, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => {
                navigate(listItem.link);
                setOpen(false); // Close the drawer on item click
              }}
            >
              <ListItemButton>
                <ListItemIcon>{listItem.icon}</ListItemIcon>
                <ListItemText primary={listItem.title} />
              </ListItemButton>
            </ListItem>
          ))}

          <Button
            variant="contained"
            className="logout"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </List>
      </div>
    </>
  );
};

export default TeacherSidebarContent;
