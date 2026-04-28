import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// CREATE
export const addResource = (data) => API.post('/research', data);

// DELETE
export const deleteResource = (id) => API.delete(`/research/${id}`);

// Global error handling
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err);
    return Promise.reject(err);
  }
);

export default API;
