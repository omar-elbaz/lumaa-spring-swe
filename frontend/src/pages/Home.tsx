import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Task Whiz
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Organize your tasks efficiently and boost your productivity
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </Button>
    </Container>
  );
}
export { LandingPage };
