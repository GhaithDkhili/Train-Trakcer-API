import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your API base URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});
