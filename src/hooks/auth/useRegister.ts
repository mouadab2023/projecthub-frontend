import React, {useState} from "react";
import {emailIsValid,passwordIsValid,nameIsValid} from "../utils/authUtils";
import authService from "../../services/authService";
import type {UserRegister} from "../../types/user";
import axios from "axios";


const useRegister = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [errorMessage,setErrorMessage] = useState("")
    const resetErrorMessage=()=>{
        if(errorMessage)
            setErrorMessage("");
    }

    const canSubmit:boolean= firstName.length > 0 && lastName.length > 0 &&
        emailIsValid(email) &&
        passwordIsValid(password) &&
        password === confirmPassword

    const firstNameError = !nameIsValid(firstName) && firstName.length > 0 ?
        "The first name must be at least 2 characters" : "";
    const lastNameError = !nameIsValid(lastName) && lastName.length > 0 ?
        "The last name must be at least 2 characters" : "";
    const emailError = !emailIsValid(email) && email.length > 0 ? "The email is invalid" : "";
    const passwordError = !passwordIsValid(password) && password.length > 0 ?
        "Password must be at least 8 characters and include an uppercase letter, a number, and a special character." : "";
    const confirmPasswordError = password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 ?
        "The passwords do not match" : ""

    const register = async (registerCreds:UserRegister) => {
        try {
            await authService.register(registerCreds);
        } catch (err:unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    if (err.response.data?.detail === "Username already used") {
                        setErrorMessage("The email is already used");
                    }
                } else {
                    setErrorMessage("Error occured, please try again later");
                }
            }
        }
    }

    const handleFirstNameInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        resetErrorMessage()
        const newFirstName = e.target.value;
        setFirstName(newFirstName);
    }
    const handleLastNameInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        resetErrorMessage()
        const newLastName = e.target.value;
        setLastName(newLastName);
    }

    const handleMailInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        resetErrorMessage()
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        resetErrorMessage()
        setPassword(e.target.value);
    }

    const handleConfirmationPasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        resetErrorMessage()
        setConfirmPassword(e.target.value);
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registerCredentials = {
            firstName,
            lastName,
            email,
            password,
        }
        register(registerCredentials);
    }
    return (
        {
            firstName,
            firstNameError,
            lastName,
            lastNameError,
            email,
            emailError,
            password,
            passwordError,
            confirmPassword,
            confirmPasswordError,
            handleFirstNameInput,
            handleLastNameInput,
            handleMailInput,
            handlePasswordInput,
            handleConfirmationPasswordInput,
            canSubmit,
            handleFormSubmit,
            errorMessage
        }
    )
}
export default useRegister;