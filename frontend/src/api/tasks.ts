import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = async (token: string) => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (
  token: string,
  title: string,
  description: string,
  isComplete: boolean = false
) => {
  try {
    const response = await axios.post(
      `${API_URL}/tasks`,
      { title, description, isComplete },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

export const editTask = async (
  token: string,
  id: number,
  title: string,
  description: string
) => {
  return axios.put(
    `${API_URL}/tasks/${id}`,
    { title, description },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateTask = async (
  token: string,
  id: number,
  title: string,
  description: string,
  isComplete: boolean
) => {
  try {
    console.log("Sending update request:", {
      id,
      title,
      description,
      isComplete,
    });
    const response = await axios.put(
      `${API_URL}/tasks/${id}`,
      { title, description, isComplete },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Update response:", response.data);
    return response; // Return the full response, not just data
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

export const deleteTask = async (token: string, id: number) => {
  return axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
