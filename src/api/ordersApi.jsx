import axios from "axios";

const API_URL = "http://localhost:8000/api/orders";

// Function to get auth headers
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    return { Authorization: `Bearer ${token}` };
};

// Fetch all orders
export const fetchOrdersApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null; // Prevent unauthorized requests

    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        return [];
    }
};

// Get a single order
export const getOrderApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error.response?.data || error.message);
        return null;
    }
};

// Create a new order
export const createOrderApi = async (order) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.post(API_URL, order, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        return null;
    }
};

// Update order
export const updateOrderApi = async (id, order) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.put(`${API_URL}/${id}`, order, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error.response?.data || error.message);
        return null;
    }
};

// Delete order
export const deleteOrderApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        await axios.delete(`${API_URL}/${id}`, { headers });
        return id;
    } catch (error) {
        console.error("Error deleting order:", error.response?.data || error.message);
        return null;
    }
};

// Download invoice
export const downloadInvoiceApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.get(`${API_URL}/${id}/invoice`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error downloading invoice:", error.response?.data || error.message);
        return null;
    }
};
