import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, useMediaQuery } from "@mui/material";
import BasicInfo from "./components/BasicInfo";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AuthInfo from "./components/AuthInfo";
import AddButton from "./components/AddButton";
import UploadAvatar from "./components/UploadAvatar";
import SpecificInfo from "./components/SpecificInfo";

// TODO...
const user: string = "teacher";

const departments = {
  title: "Department",
  itemList: [
    "Analysis",
    "Algebra and Geometry",
    "Differential and Integral Equations",
  ],
};
const subjects = {
  title: "Subject",
  itemList: ["Real Analysis", "Complex Analysis", "Group Theory"],
};
const groups = {
  title: "Group",
  itemList: ["R-11", "RM-23", "M-65"],
};

const AddTeacher: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 720px)");

  return (
    // Container
    <Box sx={{ position: "relative" }}>
      {/* BACKGROUND IMAGE ON TOP OF PROFILE PAGE */}
      <img
        style={{
          objectFit: "cover",
          height: 200,
          width: "100%",
          borderRadius: 10,
        }}
        // TODO: Change to image without watermark
        src="/src/assets/profileBackground.jpg"
      />

      {/* Container for everyhing beside background image at the top */}
      <Box sx={{ position: "relative", bottom: "120px" }}>
        <Card
          style={{
            maxWidth: "1000px",
            minWidth: "366px",
            margin: "auto",
          }}
        >
          {/* Card header */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                margin: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <PersonAddIcon />
              Add Teacher
            </Typography>
          </Box>

          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Box 1: Profile Photo and Upload Resume */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <UploadAvatar />
              {/* TODO: Add optional dropdown fields here, namely department and subject. AFAIK this is a fixed list. */}
              {/* Student or Teacher specific information */}
              {user === "student" && (
                <SpecificInfo title={groups.title} list={groups.itemList} />
              )}

              {user === "teacher" && (
                <>
                  <SpecificInfo
                    title={departments.title}
                    list={departments.itemList}
                  />
                  <SpecificInfo
                    title={subjects.title}
                    list={subjects.itemList}
                  />
                </>
              )}
            </div>
                
            {/* Box 2: First Name, Last Name, Email, Password, Confirm Password */}
            <div
              style={{
                width: isSmallScreen ? "80%" : "60%",
                minWidth: "330px",
              }}
            >
              {/* Every User needs to have these info */}
              <BasicInfo />

              {/* Specific Info */}
              {user === "profileOwner" || user === "admin" ? <></> : <></>}

              {/* AuthInfo */}
              <AuthInfo />

              {/* Add Teacher Button */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AddButton />
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AddTeacher;
