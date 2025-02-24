import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Registration failed" };
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Invalid login credentials" };
  }
};
