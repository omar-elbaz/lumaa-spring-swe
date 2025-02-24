import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend access
app.use(express.json()); // Enable JSON parsing

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("The Whiz API is running");
});
