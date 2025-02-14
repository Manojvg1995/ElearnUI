import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './Pages/Admin/MainLayout'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material'
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Customize theme color
    background: { default: '#f5f5f5' }, // Light gray background
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
})

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box 
      sx={{ 
        width: '100vw', 
        height: '100vh', // Ensure it fits the viewport height
        display: 'flex', 
        justifyContent: 'flex-end', // Align content to the right
        alignItems: 'center', // Center vertically
        backgroundColor: '#f0f0f0',
        color: 'black',
        overflow: 'hidden' // Prevent scrolling
      }}
    >
      <Container maxWidth="sm">
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
          </Routes>
        </Router>
      </Container>
    </Box>

  );
}

export default App
