import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

const Login = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/elearnapi/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNum, password }),
      });

      const data = await response.json();
      console.log('Response:', data); // Debugging

      if (data.code === 200) {
        navigate('/adminDashBoardPage'); // Redirect on success
      } else {
        alert('Login failed: ' + (data.error || 'Invalid credentials'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs" className="container">
      <Box className="login-box">
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField 
          label="Phone number" 
          variant="outlined" 
          fullWidth 
          value={phoneNum} 
          onChange={(e) => setPhoneNum(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Container sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/register" variant="body2">
            Register
          </Link>
          <Link href="/forgot-password" variant="body2">
            Forgot Password?
          </Link>
        </Container>
      </Box>
    </Container>
  );
};

export default Login;
