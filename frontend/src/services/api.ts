import axios from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_URL_BACK;

const api = axios.create({
  baseURL,
  withCredentials: false,
});

export default api;
