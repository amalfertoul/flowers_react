import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

// Function to get auth headers
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    return { Authorization: `Bearer ${token}` };
};

// Fetch all users
export const fetchUsersApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null; // Prevent unauthorized requests

    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        return [];
    }
};

// Add a new user
export const addUserApi = async (user) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.post(API_URL, user, { headers });
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
        return null;
    }
};

// Delete user
export const deleteUserApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        await axios.delete(`${API_URL}/${id}`, { headers });
        return id;
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        return null;
    }
};
