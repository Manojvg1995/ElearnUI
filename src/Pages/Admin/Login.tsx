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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const url = `${API_BASE_URL}login.php`;
      const response = await fetch(url, {
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
        backgroundColor: "#E3F2FD", // Light blue background
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
          boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.3)", // Blue shadow
          backgroundColor: "white",
          maxWidth: 360,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ color: "#1976D2" }}>
          Login
        </Typography>
        <TextField
          label="Phone number"
          variant="outlined"
          fullWidth
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1976D2" },
              "&:hover fieldset": { borderColor: "#1565C0" },
              "&.Mui-focused fieldset": { borderColor: "#0D47A1" },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1976D2" },
              "&:hover fieldset": { borderColor: "#1565C0" },
              "&.Mui-focused fieldset": { borderColor: "#0D47A1" },
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#1976D2",
            color: "white",
            "&:hover": { backgroundColor: "#1565C0" },
          }}
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
          <Link
            href="/register"
            variant="body2"
            sx={{ color: "#0D47A1", "&:hover": { color: "#1565C0" } }}
          >
            Register
          </Link>
          <Link
            href="/forgot-password"
            variant="body2"
            sx={{ color: "#0D47A1", "&:hover": { color: "#1565C0" } }}
          >
            Forgot Password?
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
