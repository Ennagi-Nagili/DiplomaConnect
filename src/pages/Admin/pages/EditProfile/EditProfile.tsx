import React from "react";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QuickInfo from "./QuickInfo";
import BasicInfo from "../AddTeacher/components/BasicInfo";

const theme = createTheme();

const InformationBlock: React.FC<{
  title: string;
  content: React.ReactNode;
}> = ({ title, content }) => {
  return (
    <Paper elevation={3} style={{ padding: 10 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {content}
    </Paper>
  );
};

const ResponsiveInformationGrid: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 792px)");

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent={"center"}>
        {/* 1. Block One */}
        <Grid
          item
          className="grid-item"
          sx={{
            minWidth: "380px",
            width: isSmallScreen ? "80%" : "49%",
            maxWidth: "700px",
          }}
        >
          <InformationBlock title="" content={<QuickInfo />} />
        </Grid>

        {/* 2. First, Last, Father Names, Email, and Phone Number*/}
        <Grid
          item
          sx={{
            minWidth: "380px",
            width: isSmallScreen ? "80%" : "49%",
            maxWidth: "700px",
            height: "578px",
          }}
        >
          <InformationBlock
            title="Basic Information"
            content={
              <>
                <BasicInfo />
                {/* <button>ADD TEACHER</button> */}
              </>
            }
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ResponsiveInformationGrid;
