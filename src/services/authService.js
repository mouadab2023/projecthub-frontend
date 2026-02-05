import axiosInstance from "./api";
const  authService = {
    login:  (creds) => axiosInstance.post("/auth/login", creds),
    register: (regiterCreds) => axiosInstance.post("/auth/signup", regiterCreds),
    logout: () => axiosInstance.post("/auth/logout"),
    refresh: ()=> axiosInstance.post("/auth/refresh"),
    resetPassword: ()=> axiosInstance.post("/auth/resetPassword"),
}
export default authService;