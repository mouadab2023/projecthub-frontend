import {useState} from "react";
import {emailIsValid} from "../utils/authUtils";

const useLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const canSubmit = emailIsValid(email);
    const emailError = !emailIsValid(email) && email.length > 0 ? "email is invalid" : "";

    const handleMailInput = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }
    return (
        {
            email: email,
            emailError: emailError,
            password: password,
            canSubmit: canSubmit,
            handleMailInput,
            handlePasswordInput,
            handleFormSubmit
        }
    )
}
export default useLogin;