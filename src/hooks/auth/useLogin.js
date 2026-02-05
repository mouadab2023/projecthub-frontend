import { useState} from "react";
import {emailIsValid} from "../utils/authUtils";
import useAuth from "./useAuth";

const useLogin = () => {
    const {login}=useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const canSubmit = emailIsValid(email);
    const emailError = !emailIsValid(email) && email.length > 0 ? "The email is invalid" : "";

    const resetErrorMessage=()=>{
        if(errorMessage)
            setErrorMessage("");
    }

    const handleMailInput = (e) => {
        resetErrorMessage()
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordInput = (e) => {
        resetErrorMessage()
        setPassword(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const loginUser={email:email, password:password}
        login(loginUser).catch(err =>{
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