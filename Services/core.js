import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'https://infopubsliher-backend.onrender.com//api',
  baseURL: 'https://infopubsliher-backend.onrender.com/api',
});


export default axiosInstance