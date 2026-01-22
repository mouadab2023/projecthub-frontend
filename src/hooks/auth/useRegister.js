import {useState} from "react";
import {emailIsValid,passwordIsValid,nameIsValid} from "../utils/authUtils";


const useRegister = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const canSubmit = firstName.length > 0 && lastName.length > 0 &&
        emailIsValid(email) &&
        passwordIsValid(password) &&
        password === confirmPassword

    const firstNameError = !nameIsValid(firstName) && firstName.length > 0 ?
        "The first name must be at least 2 characters" : "";
    const lastNameError = !nameIsValid(lastName) && lastName.length > 0 ?
        "The last name must be at least 2 characters" : "";
    const emailError = !emailIsValid(email) && email.length > 0 ? "email is invalid" : "";
    const passwordError = !passwordIsValid(password) && password.length > 0 ?
        "The password must contain at least one uppercase letter, one number, and one special character" : "";
    const confirmPasswordError = password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 ?
        "The passwords do not match" : ""


    const handleFirstNameInput = (e) => {
        const newFirstName = e.target.value;
        setFirstName(newFirstName);
    }
    const handleLastNameInput = (e) => {
        const newLastName = e.target.value;
        setLastName(newLastName);
    }

    const handleMailInput = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmationPasswordInput = (e) => {
        setConfirmPassword(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
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
            handleFormSubmit
        }
    )
}
export default useRegister;