import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Adjust this if needed
axios.defaults.withCredentials = true; // Important for Sanctum

export const login = async (email, password) => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie"); // CSRF token request
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  
    return response;
  };

  export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  

  export const logout = () => {
    localStorage.removeItem("user"); // Clear user data
    return axios.post(`${API_BASE_URL}/logout`);
  };


  