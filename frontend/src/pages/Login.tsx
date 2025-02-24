import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      // console.log(response);
      localStorage.setItem("token", response.token);
      navigate("/tasks");
    } catch (error) {
      // console.log(error);
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ padding: 3, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Task Whiz Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Not a user?{" "}
          <Link
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer" }}
          >
            Register Here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
