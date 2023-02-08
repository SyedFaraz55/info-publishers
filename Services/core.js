import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'https://infopubsliher-backend.onrender.com/api',
  baseURL: 'http://localhost:8080/api',
});


export default axiosInstance