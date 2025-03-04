import axios from "axios";

const API_URL = "http://localhost:8000/api/events";

// Function to get auth headers
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    return { Authorization: `Bearer ${token}` };
};

// Fetch all events
export const fetchEventsApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null; 

    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error.response?.data || error.message);
        return [];
    }
};

// Get a single event
export const getEventApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching event:", error.response?.data || error.message);
        return null;
    }
};

// Create a new event
export const addEventApi = async (event) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.post(API_URL, event, { headers });
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error.response?.data || error.message);
        return null;
    }
};

// Update event
export const updateEventApi = async (id, event) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.put(`${API_URL}/${id}`, event, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating event:", error.response?.data || error.message);
        return null;
    }
};

// Delete event
export const deleteEventApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        await axios.delete(`${API_URL}/${id}`, { headers });
        return id;
    } catch (error) {
        console.error("Error deleting event:", error.response?.data || error.message);
        return null;
    }
};

// Export events
export const exportEventsApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.get(`${API_URL}/export`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error exporting events:", error.response?.data || error.message);
        return null;
    }
};
