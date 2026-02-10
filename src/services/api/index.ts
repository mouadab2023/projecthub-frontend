import axios, {type AxiosInstance} from "axios";

const BaseURL = "http://localhost:8080";
const axiosInstance:AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: BaseURL
})

export default axiosInstance;
