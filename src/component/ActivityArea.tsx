import React from "react";
import { Box, Typography } from "@mui/material";
import LandingPage from "../Pages/Admin/LandingPage";
import StudentList from "../Pages/Admin/Student";

interface ActivityAreaProps {
  selectedContent: string;
}

const ActivityArea: React.FC<ActivityAreaProps> = ({ selectedContent }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        {selectedContent}
      </Typography>

      {selectedContent === "Dashboard" && <LandingPage/>}
      {selectedContent === "Student" && <StudentList/>}
      {selectedContent === "Settings" && <Typography>Adjust your Settings here.</Typography>}
      {selectedContent === "Reports" && <Typography>View Reports here.</Typography>}
    </Box>
  );
};

export default ActivityArea;
