import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';

export const ListItems = ({ open, profile }: { open: boolean; profile: boolean }) => {
  let display: string;
  let hide = 'none';
  let btn = { icon: <AssignmentIcon />, text: 'Tasks' };

  if (open) {
    display = 'block';
  } else {
    display = 'none';
  }

  if (profile) {
    hide = 'flex';
    btn = { icon: <CheckCircleOutlineIcon />, text: 'Requests' };
  }

  return (
    <React.Fragment>
      <ListSubheader component="div" sx={{ display: { display } }}>
        Navigation
      </ListSubheader>
      <ListItemButton
        onClick={() => {
          document.getElementById('section-request')?.scrollIntoView();
        }}
      >
        <ListItemIcon>{btn.icon}</ListItemIcon>
        <ListItemText primary={btn.text} />
      </ListItemButton>
      <ListItemButton
        sx={{ display: hide }}
        onClick={() => {
          document.getElementById('section-students')?.scrollIntoView();
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="My students" />
      </ListItemButton>
    </React.Fragment>
  );
};
