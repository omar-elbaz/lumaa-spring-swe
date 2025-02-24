import AdbIcon from "@mui/icons-material/Adb";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar sx={{ justifyContent: "flex-start" }}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Whiz
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={token ? <Tasks /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}
