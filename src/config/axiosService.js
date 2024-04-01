import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL, // Replace with your API base URL
});

export default axiosInstance;
