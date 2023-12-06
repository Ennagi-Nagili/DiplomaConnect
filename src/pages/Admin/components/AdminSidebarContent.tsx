import React, { useState } from "react";
import { Collapse, Divider, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { People, Person, School } from "@mui/icons-material";
import { Page, pages } from "../Admin";
import { useNavigate } from "react-router-dom";

type AdminSidebarContentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminSidebarContent: React.FC<AdminSidebarContentProps> = ({
  setOpen,
}) => {
  const navigate = useNavigate();

  const [usersOpen, setUsersOpen] = useState(false);

  const handleUsersToggle = () => {
    setUsersOpen(!usersOpen);
  };

  return (
    <>
      <List>
        {pages.map((page: Page, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => {
              navigate(`/profile/${page.link}`);
              setOpen(false); // Close the drawer on item click
            }}
          >
            <ListItemButton>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Users: Students and Teachers */}
      <List>
        {/* Main Users Section */}
        <ListItem onClick={handleUsersToggle} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        {/* Users Subsections */}
        <Collapse in={usersOpen} timeout="auto" unmountOnExit>
          {/* Students Subsection */}
          <List disablePadding>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Teachers Subsection */}
          <List disablePadding>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AdminSidebarContent;
