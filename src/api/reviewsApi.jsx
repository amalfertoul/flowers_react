import axios from "axios";

const API_URL = "http://localhost:8000/api/reviews";

// Function to get auth token
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    return { Authorization: `Bearer ${token}` };
};


export const fetchReviewsApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null; // Prevent unauthorized requests

    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error.response?.data || error.message);
        return []; 
    }
};


export const getReviewApi = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching review with ID ${id}:`, error.response?.data || error.message);
        return null;
    }
};

export const addReviewApi = async (review) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.post(API_URL, review, { headers });
        return response.data;
    } catch (error) {
        console.error("Error adding review:", error.response?.data || error.message);
        return null;
    }
};

export const updateReviewApi = async (payload) => { 
    const headers = getAuthHeader();
    if (!headers) return null;
  
    try {
      const response = await axios.put(`${API_URL}/${payload.id}`, payload.review, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating review with ID ${payload.id}:`, error.response?.data || error.message);
      return null;
    }
};


export const deleteReviewApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        await axios.delete(`${API_URL}/${id}`, { headers });
        return id;
    } catch (error) {
        console.error(`Error deleting review with ID ${id}:`, error.response?.data || error.message);
        return null;
    }
};
