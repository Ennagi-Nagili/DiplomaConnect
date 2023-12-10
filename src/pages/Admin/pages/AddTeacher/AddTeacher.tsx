import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, useMediaQuery } from "@mui/material";
import ProfilePhotoBox from "./ProfilePhotoBox";
import BasicInfo from "./BasicInfo";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AuthInfo from "./AuthInfo";
import AddButton from "./AddButton";

// TODO...
const user: string = "teacher";

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
            {/* TODO: Make a button below avatar that onClick adds chosen file from file explorer,
                and turns into "Clear" button when file is uploaded. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ProfilePhotoBox />
              {/* TODO: Add optional dropdown fields here, namely department and subject. AFAIK this is a fixed list. */}
              {user === "student" && (
                // Student specific information
                <>
                  <div>TODO: Group</div>
                </>
              )}
              {user === "teacher" && (
                <>
                  <div>TODO: Department</div>
                  <div>TODO: Subject</div>
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
