import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CakeIcon from '@mui/icons-material/Cake';
import CommentIcon from '@mui/icons-material/Comment';
import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import React from 'react';
import SchoolIcon from '@mui/icons-material/School';

export const MainListItems = ({ profile }: { profile: boolean }) => {
  const items1 = [
    { icon: <SchoolIcon />, text: 'Academic results' },
    { icon: <EmojiEventsIcon />, text: 'Achievements' },
    { icon: <CommentIcon />, text: 'Reviews of teachers' },
  ];

  const items2 = [
    { icon: <SchoolIcon />, text: 'Education & academic degrees' },
    { icon: <BusinessCenterIcon />, text: 'Profesional background' },
    { icon: <EventSeatIcon />, text: 'International events' },
  ];

  let items = items1;
  let hide = 'none';

  if (profile) {
    items = items2;
    hide = 'flex';
  }

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          document.getElementById('header')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Name" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          document.getElementById('section-name')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Phone" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          document.getElementById('section-phone')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Email" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          document.getElementById('section-mail')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <CakeIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <pre
              className="MuiTypography-root MuiTypography-body1 
        MuiListItemText-primary css-10hburv-MuiTypography-root"
            >
              {'Birth place \nand date'}
            </pre>
          }
        />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          document.getElementById('section-date')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <pre
              className="MuiTypography-root MuiTypography-body1 
        MuiListItemText-primary css-10hburv-MuiTypography-root"
            >
              {items[0].text}
            </pre>
          }
        />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          document.getElementById('section-education')?.scrollIntoView();
        }}
      >
        <ListItemIcon>{items[1].icon}</ListItemIcon>
        <ListItemText
          primary={
            <pre
              className="MuiTypography-root MuiTypography-body1 
        MuiListItemText-primary css-10hburv-MuiTypography-root"
            >
              {items[1].text}
            </pre>
          }
        />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          document.getElementById('section-work')?.scrollIntoView();
        }}
      >
        <ListItemIcon>{items[2].icon}</ListItemIcon>
        <ListItemText
          primary={
            <pre
              className="MuiTypography-root MuiTypography-body1 
        MuiListItemText-primary css-10hburv-MuiTypography-root"
            >
              {items[2].text}
            </pre>
          }
        />
      </ListItemButton>

      <ListItemButton
        sx={{ display: hide }}
        onClick={() => {
          document.getElementById('section-event')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItemButton>
    </React.Fragment>
  );
};
