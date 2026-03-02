import React, {createContext, type ReactNode, useEffect, useRef, useState} from "react";
import authService from "../services/authService";
import axiosInstance from "../services/api";
import type {User,UserLogin} from "../types/user"

type AuthContextType = {
    user: User | null;
    initialLoading: boolean;
    setUser:React.Dispatch<React.SetStateAction<AuthContextType["user"]>>;
    login:(credentials: UserLogin) => Promise<void>;
    logout:() => Promise<void>;
    jwtToken:string | null;
}
type Props={
    children:ReactNode;
}

export const AuthContext = createContext<AuthContextType|null>(null);

const AuthProvider = ({children}:Props) => {
    const tokenRef = useRef<string | null>(null);

    const [jwtToken, setJwtToken] = useState<string|null>(null);
    const [expiresIn, setExpiresIn] = useState<number|null>(null);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const [user, setUser] = useState<User|null>(null);

    const login = async (creds:UserLogin) => {
        try {
            const res = await authService.login(creds);
            setUser(res.data.user);
            tokenRef.current = res.data.token;
            setJwtToken(res.data.token);
            setExpiresIn(res.data.expiresIn);
        } catch (err) {
            throw err;
        }
    }
    const logout = async () => {
        try {
            await authService.logout()
        }catch(err){
            console.log(err);
        }finally {
            tokenRef.current = null;
            setJwtToken(null);
            setUser(null);
            setExpiresIn(null);
        }
    }
    const configInterceptors=()=> {
        axiosInstance.interceptors.request.clear();
        axiosInstance.interceptors.response.clear();

        axiosInstance.interceptors.request.use((config) => {
            const noAuthUrls = ["auth/login", "auth/signup"];
            if (tokenRef.current && (config.url !== "" && config.url && !noAuthUrls.includes(config.url))) {
                config.headers.Authorization = `Bearer ${tokenRef.current}`;
            }
            return config;
        }, (error) => {
            console.error("Request error ::", error);
            return Promise.reject(error);
        })
        axiosInstance.interceptors.response.use(
            (res) => res,
            async (error) => {
                const config = error.config as any;

                if (!config) {
                    return Promise.reject(error);
                }
                if (!error.response) {
                    return Promise.reject(error);
                }
                if (error.response.status !== 401) {
                    return Promise.reject(error);
                }
                if (config.url?.includes("/auth/refresh")) {
                    return Promise.reject(error);
                }
                if (config._retried) {
                    await logout();
                    return Promise.reject(error);
                }
                config._retried = true;
                try {
                    const r = await authService.refresh();
                    setUser(r.data.user);
                    setJwtToken(r.data.token);
                    tokenRef.current = r.data.token;
                    setExpiresIn(r.data.expiresIn);
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${r.data.token}`;
                    return axiosInstance(config); // un seul retry
                } catch (err) {
                    await logout();
                    return Promise.reject(err);
                }
            }
        );
    }
    useEffect(() => {
        configInterceptors();
        const refresh =async () => {
            try {
                const res=await authService.refresh();
                setUser(res.data.user);
                setJwtToken(res.data.token);
                tokenRef.current = res.data.token;
                setExpiresIn(res.data.expiresIn)
            }catch(err){
                setUser(null);
                setJwtToken(null);
                setExpiresIn(null)
                } finally{
                setInitialLoading(false);
            }
        }
        refresh();
    }, []);



    return (<AuthContext.Provider value={{initialLoading,user, setUser, login, logout,jwtToken}}>
        {children}
    </AuthContext.Provider>);
}
export default AuthProvider;