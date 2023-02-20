import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://13.235.100.69:8000/api',
  baseURL: 'http://13.235.100.69:8000/api',
});


export default axiosInstance