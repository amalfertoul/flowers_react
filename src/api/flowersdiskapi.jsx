import axios from "axios";

const API_URL = "http://localhost:8000/api/flowersdisk";

// Function to get the auth token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. User might not be authenticated.");
        return null;
    }
    console.log("Token found, adding Authorization header.");
    return { Authorization: `Bearer ${token}` };
};

// Fetch flowers from the API
export const fetchFlowersDiskApi = async () => {
    console.log("Fetching flowers disk...");

    const headers = getAuthHeader();
    if (!headers) {
        console.log("No auth headers found, returning empty array.");
        return [];  // Return an empty array if no auth token
    }

    try {
        console.log("Sending request to fetch flowers...");
        const response = await axios.get(API_URL, { headers });
        console.log("Flowers fetched successfully:", response.data);
        return response.data;  // Return the flowers data from the response
    } catch (error) {
        console.error("Error fetching flowersdisk:", error.response?.data || error.message);
        return [];  // Return empty array in case of an error
    }
};

// Update a flower in the database
export const updateFlowersDiskApi = async (payload) => {
    console.log(`Updating flower with ID: ${payload.id}`);

    const headers = getAuthHeader();
    if (!headers) {
        console.log("No auth headers found, cannot update flower.");
        return null;
    }

    try {
        console.log(`Sending request to update flower with ID: ${payload.id}...`);
        const response = await axios.put(`${API_URL}/${payload.id}`, payload.data, { headers });
        console.log("Flower updated successfully:", response.data);
        return response.data;  // Return the updated flower data
    } catch (error) {
        console.error(`Error updating flowersdisk with ID ${payload.id}:`, error.response?.data || error.message);
        return null;
    }
};
