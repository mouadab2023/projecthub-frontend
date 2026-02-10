import React, {useState} from "react";
import {emailIsValid} from "../utils/authUtils";


const useResetPassword = () => {

        const [email, setEmail] = useState<string>("");
        const [errorMessage,setErrorMessage] = useState<string>("")

        const canSubmit:boolean = emailIsValid(email);
        const emailError = !emailIsValid(email) && email.length > 0 ? "email is invalid" : "";

        const handleMailInput = (e:React.ChangeEvent<HTMLInputElement>) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
        }
        const resetPassword = async () => {}

        const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
        }
        return (
            {
                email: email,
                emailError: emailError,
                canSubmit: canSubmit,
                handleMailInput,
                handleFormSubmit,
                errorMessage
            }
        )
}
export default useResetPassword;