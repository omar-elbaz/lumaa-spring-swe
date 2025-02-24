import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

// Add this type declaration at the top of the file, after the imports
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

dotenv.config();

const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Middleware for authentication
const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch {
    res.status(403).send({ error: "Invalid token" });
    return;
  }
};

router.get("/", authenticate, async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks WHERE userId = $1", [
    req.userId,
  ]);
  res.json(tasks.rows);
});

router.post("/", authenticate, async (req, res) => {
  const { title, description, isComplete } = req.body;
  // console.log("here");
  await pool.query(
    "INSERT INTO tasks (title, description, userId, isComplete) VALUES ($1, $2, $3, $4)",
    [title, description, req.userId, isComplete]
  );
  res.status(201).send({ message: "Task created" });
});

router.put("/:id", authenticate, async (req, res) => {
  const { title, description, isComplete } = req.body;
  await pool.query(
    "UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userId = $5",
    [title, description, isComplete, req.params.id, req.userId]
  );
  res.send({ message: "Task updated" });
});

router.delete("/:id", authenticate, async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id = $1 AND userId = $2", [
    req.params.id,
    req.userId,
  ]);
  res.send({ message: "Task deleted" });
});

export default router;
