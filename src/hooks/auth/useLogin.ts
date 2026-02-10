import React, { useState} from "react";
import {emailIsValid} from "../utils/authUtils";
import useAuth from "./useAuth";
import type {AxiosError} from "axios";

type AuthErrorResponse = {
    detail?: string;
};

const useLogin = () => {
    const {login}=useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");


    const canSubmit:boolean  = emailIsValid(email);
    const emailError:string = !emailIsValid(email) && email.length > 0 ? "The email is invalid" : "";

    const resetErrorMessage=():void=>{
        if(errorMessage)
            setErrorMessage("");
    }

    const handleMailInput = (e:React.ChangeEvent<HTMLInputElement>):void => {
        resetErrorMessage();
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordInput = (e:React.ChangeEvent<HTMLInputElement>):void => {
        resetErrorMessage();
        setPassword(e.target.value);
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        const loginUser={email:email, password:password};
        login(loginUser).catch((err:AxiosError<AuthErrorResponse>) =>{
            if (err.response?.status === 401) {
                if (err.response.data?.detail === "Bad credentials") {
                    setErrorMessage("Email or password incorrect");
                } else {
                    setErrorMessage("Acces not authorized");
                }
            } else {
                setErrorMessage("Error occured, please try again later");
            }
        });
    }
    return (
        {
            email: email,
            emailError: emailError,
            password: password,
            errorMessage: errorMessage,
            canSubmit: canSubmit,
            handleMailInput,
            handlePasswordInput,
            handleFormSubmit
        }
    )
}
export default useLogin;