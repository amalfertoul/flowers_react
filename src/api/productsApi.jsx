import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

// Function to get auth token
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    return { Authorization: `Bearer ${token}` };
};

// Fetch all products
export const fetchProductsApi = async () => {
    const headers = getAuthHeader();
    if (!headers) return null; // Prevent API call if no token

    try {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        return null; // Prevent breaking the UI
    }
};

// Get a single product
export const getProductApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error.response?.data || error.message);
        return null;
    }
};

// Add a new product
export const addProductApi = async (product) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        const response = await axios.post(API_URL, product, { headers });
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        return null;
    }
};

// Delete a product
export const deleteProductApi = async (id) => {
    const headers = getAuthHeader();
    if (!headers) return null;

    try {
        await axios.delete(`${API_URL}/${id}`, { headers });
        return id;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error.response?.data || error.message);
        return null;
    }
};
