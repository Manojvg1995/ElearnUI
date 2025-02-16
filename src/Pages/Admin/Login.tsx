import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost/elearnapi/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNum, password }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.code === 200) {
        navigate("/adminDashBoardPage");
      } else {
        alert(`Login failed: ${data.error || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          maxWidth: 360,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Phone number"
          variant="outlined"
          fullWidth
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/register" variant="body2">
            Register
          </Link>
          <Link href="/forgot-password" variant="body2">
            Forgot Password?
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
