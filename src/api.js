import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your Flask API URL

// Register user
export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/signuppage`, {
        username,
        email,
        password
    });
    return response.data;
};

// Login user
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/loginpage`, {
        email,
        password
    });
    return response.data;
};

// Get user data
export const getUser = async (token) => {
    const response = await axios.get(`${API_URL}/user`, {
        headers: {
            'x-access-token': token
        }
    });
    return response.data;
};
