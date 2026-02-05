import React, {createContext, useEffect, useState} from "react";
import authService from "../services/authService";
import axios from "axios";
import axiosInstance from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [jwtToken, setJwtToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    const [user, setUser] = useState(null);

    const login = async (creds) => {
        try {
            const res = await authService.login(creds);
            setUser(res.data.user);
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
            setJwtToken(null);
            setUser(null);
            setExpiresIn(null);
        }
    }

    useEffect(() => {
        const refresh =async () => {
            try {
                const res=await authService.refresh();
                setUser(res.data.user);
                setJwtToken(res.data.token);
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

    useEffect(() => {
        axiosInstance.interceptors.request.use((config) => {
            const noAuthUrls = ["auth/login", "auth/signup"];
            if (jwtToken && !noAuthUrls.includes(config.url)) {
                config.headers.Authorization = `Bearer ${jwtToken}`;
            }
            return config;
        }, (error) => {
            console.error("Request error ::", error);
            return Promise.reject(error);
        })
        axios.interceptors.response.use((res) => {
            return res;
        }, async (error) => {
            if (!error.config || (error.response && error.response.status !== 401)) {
                return Promise.reject(error);
            } else {
                if (error.config._retried) {
                    await logout();
                    return Promise.reject(error);
                } else {
                    error.config._retried = true;
                    return authService.refresh().then(r => {
                        setUser(r.data.user);
                        setJwtToken(r.data.token);
                        setExpiresIn(r.data.expiresIn)
                        error.config.headers.Authorization = `Bearer ${r.data.token}`;
                        return axiosInstance(error.config)
                    }).catch( async err => {
                        await logout();
                        return Promise.reject(err);
                    })
                }
            }
        });
    }, [jwtToken]);

    return (<AuthContext.Provider value={{initialLoading,user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>)
}
export default AuthProvider;