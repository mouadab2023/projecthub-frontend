import axiosInstance from "./api";
import type {User, UserLogin, UserLoginResponse, UserRegister} from "../types/user";
const  authService = {
    login:  (creds:UserLogin) => axiosInstance.post<UserLoginResponse>("/auth/login", creds),
    register: (regiterCreds:UserRegister) => axiosInstance.post<User>("/auth/signup", regiterCreds),
    logout: () => axiosInstance.post<void>("/auth/logout"),
    refresh: ()=> axiosInstance.post<UserLoginResponse>("/auth/refresh"),
    resetPassword: ()=> axiosInstance.post("/auth/resetPassword"),
}
export default authService;