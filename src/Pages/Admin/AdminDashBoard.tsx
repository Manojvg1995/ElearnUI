import React from "react";
import Header from "../../component/Header";
import {
    Box,
  } from '@mui/material'
const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Header/>
    </Box>
  );
};

export default AdminDashboard;
