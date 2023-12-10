import { Box } from "@mui/material";
import UploadAvatar from "../AddTeacher/UploadAvatar";

const QuickInfo = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "458px" }}
    >
      {/* This box is for bakcgrounf image, profile picture, and basic info (Name, Email, Status) */}
      <img
        src="/src/assets/profileBackground.jpg"
        style={{
          height: "120px",
          width: "100%",
          objectFit: "cover",
        }}
      />

      {/* This whole box is shifted up to match the level of bakcground image */}
      <Box
        style={{
          position: "relative",
          bottom: "100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <UploadAvatar />
        <div>Nurmammadov Murad</div>
        <div>Student at Baku State University</div>
        <div>nurmammadovmurad@gmail.com</div>
      </Box>
    </div>
  );
};

export default QuickInfo;
