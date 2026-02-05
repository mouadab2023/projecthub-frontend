import {useState} from "react";
import {emailIsValid} from "../utils/authUtils";
import authService from "../../services/authService";


const useResetPassword = () => {

        const [email, setEmail] = useState("");
        const [errorMessage,setErrorMessage] = useState("")

        const canSubmit = emailIsValid(email);
        const emailError = !emailIsValid(email) && email.length > 0 ? "email is invalid" : "";

        const handleMailInput = (e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
        }
        const resetPassword = async () => {}

        const handleFormSubmit = (e) => {
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