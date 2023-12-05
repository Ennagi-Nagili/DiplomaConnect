import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader, { ListSubheaderClasses } from '@mui/material/ListSubheader';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import BookIcon from '@mui/icons-material/Book';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleIcon from '@mui/icons-material/People';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={() => {
      location.href = "#section-name"
    }}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Name"/>
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-phone"
    }}>
      <ListItemIcon>
        <PhoneIcon/>
      </ListItemIcon>
      <ListItemText primary="Phone" />
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-mail"
    }}>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="Email" />
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-date"
    }}>
      <ListItemIcon>
        <CakeIcon />
      </ListItemIcon>
      <ListItemText primary={<pre className='MuiTypography-root MuiTypography-body1 
      MuiListItemText-primary css-10hburv-MuiTypography-root'>
        {"Birth place \nand date"}</pre>} />
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-education"
    }}>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary={<pre className='MuiTypography-root MuiTypography-body1 
      MuiListItemText-primary css-10hburv-MuiTypography-root'>
        {"Education & \nAcademic degrees"}</pre>} />
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-work"
    }}>
      <ListItemIcon>
        <BusinessCenterIcon />
      </ListItemIcon>
      <ListItemText primary={<pre className='MuiTypography-root MuiTypography-body1 
      MuiListItemText-primary css-10hburv-MuiTypography-root'>
        {"Profesional \nbackground"}</pre>} />
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-event"
    }}>
      <ListItemIcon>
        <EventSeatIcon />
      </ListItemIcon>
      <ListItemText primary={<pre className='MuiTypography-root MuiTypography-body1 
      MuiListItemText-primary css-10hburv-MuiTypography-root'>
        {"International \nevents"}</pre>} />
    </ListItemButton>

    <ListItemButton onClick={() => {
      location.href = "#section-books"
    }}>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Books" />
    </ListItemButton>
  </React.Fragment>
);

export const SecondaryListItems = ({open}: {open: boolean}) => {
  let display: string;

  if(open) {
    display = "block"
  } else {
    display = "none"
  }

  return (
    <React.Fragment>
    <ListSubheader component="div" sx={{display: {display}}}>
        Navigation
      </ListSubheader>
    <ListItemButton onClick={() => {
      document.getElementById("section-request")?.scrollIntoView()
    }}>
      <ListItemIcon>
        <CheckCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Requests" />
    </ListItemButton>
    <ListItemButton onClick={() => {
      location.href = "#section-students"
    }}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="My students" />
    </ListItemButton>
  </React.Fragment>
  )
}