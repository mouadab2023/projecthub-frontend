import {useState} from "react";
import {emailIsValid,passwordIsValid,nameIsValid} from "../utils/authUtils";
import authService from "../../services/authService";


const useRegister = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const resetErrorMessage=()=>{
        if(errorMessage)
            setErrorMessage("");
    }

    const canSubmit = firstName.length > 0 && lastName.length > 0 &&
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

    const register = async (registerCreds) => {
        try {
            await authService.register(registerCreds);
        } catch (err) {
            if (err.response?.status === 409) {
                if (err.response.data?.detail === "Username already used") {
                    setErrorMessage("The email is already used");
                }
            }else {
                setErrorMessage("Error occured, please try again later");
            }
        }
    }

    const handleFirstNameInput = (e) => {
        resetErrorMessage()
        const newFirstName = e.target.value;
        setFirstName(newFirstName);
    }
    const handleLastNameInput = (e) => {
        resetErrorMessage()
        const newLastName = e.target.value;
        setLastName(newLastName);
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

    const handleConfirmationPasswordInput = (e) => {
        resetErrorMessage()
        setConfirmPassword(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const registerCredentials = {
            firstName,
            lastName,
            email,
            password,
        }
        register(registerCredentials)
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