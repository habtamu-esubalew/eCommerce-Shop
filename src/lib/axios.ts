import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      
      const errorMessage = 
        responseData?.message || 
        responseData?.error || 
        error.message;
      
      switch (status) {
        case 400:
          error.message = errorMessage || "Invalid request. Please check your input and try again.";
          break;
        case 401:
          error.message = errorMessage || "Invalid credentials. Please check your username and password.";
          break;
        case 403:
          error.message = errorMessage || "You do not have permission to perform this action.";
          break;
        case 404:
          error.message = errorMessage || "Resource not found";
          break;
        case 500:
          error.message = errorMessage || "Server error. Please try again later";
          break;
        default:
          error.message = errorMessage || "An error occurred";
      }
    } else if (error.request) {
      error.message = "Network error. Please check your connection and try again.";
    } else {
      error.message = error.message || "An unexpected error occurred";
    }
    
    (error as any).responseData = error.response?.data;
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

