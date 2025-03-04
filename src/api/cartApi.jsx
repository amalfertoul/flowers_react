import axios from "axios";

const API_URL = "http://localhost:8000/api/cart";

// Function to get auth headers
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    return { Authorization: `Bearer ${token}` };
};

// Fetch cart items
export const fetchCartApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null; 

    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error.response?.data || error.message);
        return [];
    }
};

// Get a single cart item
export const getCartItemApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart item:", error.response?.data || error.message);
        return null;
    }
};

// Add an item to cart
export const addToCartApi = async (item) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.post(API_URL, item, { headers });
        return response.data;
    } catch (error) {
        console.error("Error adding item to cart:", error.response?.data || error.message);
        return null;
    }
};

// Update cart item
export const updateCartItemApi = async (id, item) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.put(`${API_URL}/${id}`, item, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error.response?.data || error.message);
        return null;
    }
};

// Remove item from cart
export const removeCartItemApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        await axios.delete(`${API_URL}/${id}`, { headers });
        return id;
    } catch (error) {
        console.error("Error removing item from cart:", error.response?.data || error.message);
        return null;
    }
};
