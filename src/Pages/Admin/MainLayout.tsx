import React from 'react'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import Grid from '@mui/material/Grid2';
import Login from './Login';

const MainLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Login/>
  </Box>
  );
}

export default MainLayout
