import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTeacher from "./pages/AddTeacher/AddTeacher";
import Teachers from "./pages/Teachers/Teachers";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

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

type Page = {
  link: string;
  element: JSX.Element;
};

const AdminSidebarPages: Page[] = [
  {
    // TODO: this link should be reserved for Homepage (that is for Authentication Page)
    link: "", // Because Dashboard is opened in profile
    element: <Dashboard />,
  },
  {
    link: "add-teacher",
    element: <AddTeacher />,
  },
  {
    link: "teachers",
    element: <Teachers />,
  },
  {
    link: "students",
    element: <Teachers />,
  },
];

// TODO: Add links
const TeacherSidebarPages: Page[] = [
  {
    link: "",
    element: <></>
  }
]

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      {/* Without marginTop Header shows on top of Main component */}
      <Main open={open} sx={{ marginTop: "64px" }}>
        {/* TODO: If admin: */}
        <Routes>
          {AdminSidebarPages.map((page, index) => (
            <Route key={index} path={`${page.link}`} element={page.element} />
          ))}
        </Routes>

        {/* TODO: If teacher: */}
        <Routes>
          {TeacherSidebarPages.map((page, index) => (
            <Route key={index} path={`${page.link}`} element={page.element} />
          ))}
        </Routes>
      </Main>
    </Box>
  );
}
