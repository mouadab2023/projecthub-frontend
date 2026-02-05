import axios from "axios";

const BaseURL = "http://localhost:8080";
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: BaseURL
})

export default axiosInstance;
