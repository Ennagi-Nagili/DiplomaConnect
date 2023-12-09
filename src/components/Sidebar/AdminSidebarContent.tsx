import React, { useState } from "react";
import { Divider, List, ListSubheader } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Person, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Teachers from "../../pages/Admin/pages/Teachers/Teachers";
import AddTeacher from "../../pages/Admin/pages/AddTeacher/AddTeacher";
import Dashboard from "../../pages/Admin/pages/Dashboard/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BarChartIcon from "@mui/icons-material/BarChart";

type AdminSidebarContentProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminSidebarContent: React.FC<AdminSidebarContentProps> = ({
  setOpen,
}) => {
  const navigate = useNavigate();

  // Add types if needed
  const listContent = [
    {
      subheader: "Dashboard",
      content: [
        {
          id: 1,
          title: "Dashboard",
          link: "", // Because Dashboard is opened in profile [Note: this link is "/profile"]
          icon: <BarChartIcon />,
          element: <Dashboard />,
        },
      ],
    },
    {
      subheader: "Users",
      content: [
        {
          id: 2,
          title: "Teachers",
          link: "teachers",
          icon: <Person />,
          element: <Teachers />,
        },
        {
          id: 3,
          title: "Students",
          link: "students",
          icon: <School />,
          element: <Teachers />,
        },
      ],
    },
    {
      subheader: "AddTeacher",
      content: [
        {
          id: 4,
          title: "Add Teacher",
          link: "add-teacher",
          icon: <PersonAddIcon />,
          element: <AddTeacher />,
        },
      ],
    },
  ];

  const [itemKey, setItemKey] = useState(1);

  return (
    <>
      {listContent.map((list, index) => (
        <div key={index}>
          <Divider />
          <List
            subheader={
              <ListSubheader style={{ height: "40px" }}>
                {list.subheader}
              </ListSubheader>
            }
          >
            {list.content.map((listItem, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  navigate(`/profile/${listItem.link}`);
                  setOpen(false); // Close the drawer on item click
                }}
              >
                <ListItemButton
                  selected={itemKey === listItem.id}
                  onClick={() => setItemKey(listItem.id)}
                >
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
