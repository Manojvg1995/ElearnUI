import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import AdminDashBoard from "./Pages/Admin/adminDashBoard";
import Login from "./Pages/Admin/Login";

function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <CssBaseline /> {/* Reset global styles */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminDashBoardPage" element={<AdminDashBoard />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
