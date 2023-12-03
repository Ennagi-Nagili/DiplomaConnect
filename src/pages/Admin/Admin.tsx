import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SvgIconProps } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import SchoolIcon from "@mui/icons-material/School";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTeacher from "./pages/AddTeacher/AddTeacher";
import Users from "./pages/Users/Users";
import { Header } from "./components/Header";
import { DrawerHeader, Sidebar } from "./components/Sidebar";

// const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export type Page = {
  title: string;
  link: string;
  icon: React.ReactElement<SvgIconProps>;
  element: JSX.Element;
};
export const pages = [
  {
    title: "Dashboard",
    link: "dashboard",
    icon: <BarChartIcon />,
    element: <Dashboard />,
  },
  {
    title: "Add Teacher",
    link: "add-teacher",
    icon: <PersonAddIcon />,
    element: <AddTeacher />,
  },
  {
    title: "Teachers",
    link: "teachers",
    icon: <SchoolIcon />,
    element: <Users />,
  },
  {
    title: "Students",
    link: "students",
    icon: <SchoolIcon />,
    element: <Users />,
  },
];

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <Main open={open} sx={{}}>
        {/* Without this component upper part of main section would be under Header component. */}
        <DrawerHeader />

        <Routes>
          {pages.map((page, index) => (
            <Route key={index} path={`${page.link}`} element={page.element} />
          ))}
        </Routes>
      </Main>
    </Box>
  );
}
