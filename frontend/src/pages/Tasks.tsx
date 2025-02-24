import { CheckCircle, Delete } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
  updateTask,
} from "../api/tasks";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setStatus] = useState(false);
  const token = localStorage.getItem("token");
  const [openEdit, setOpenEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await getTasks(token as string);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetchTasks");
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async () => {
    try {
      // console.log("Creating task with:", { title, description, isComplete });

      await createTask(token as string, title, description, isComplete);
      setTitle("");
      setDescription("");
      setStatus(false);
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleEditTask = async () => {
    if (!selectedTask) return;

    try {
      await editTask(
        token as string,
        selectedTask.id,
        editTitle,
        editDescription
      );
      handleCloseEdit();
      fetchTasks();
    } catch (error) {
      console.error("failed to edit task:", error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      console.log("Current task state:", task);
      const newStatus = !task.isComplete;
      console.log("Updating to status:", newStatus);

      const response = await updateTask(
        token as string,
        task.id,
        task.title,
        task.description,
        newStatus
      );

      console.log("Update successful:", response);
      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(token as string, id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Task Whiz
      </Typography>
      <Card sx={{ padding: 2, mb: 3 }}>
        <CardContent>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateTask}
            sx={{ mt: 2 }}
          >
            Add Task
          </Button>
        </CardContent>
      </Card>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleUpdateTask(task)}>
                  <CheckCircle
                    color={task.isComplete ? "success" : "disabled"}
                  />
                </IconButton>
                <IconButton onClick={() => handleOpenEdit(task)}>
                  <EditNoteIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(task.id)}>
                  <Delete color="error" />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={task.title}
              secondary={task.description}
              sx={{ textDecoration: task.isComplete ? "line-through" : "none" }}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEditTask} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tasks;
