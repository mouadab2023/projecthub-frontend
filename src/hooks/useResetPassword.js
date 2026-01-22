import {useState} from "react";

const useResetPassword = () => {

        const [email, setEmail] = useState("");

        const emailIsValid = (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        }
        const canSubmit = emailIsValid(email);
        const emailError = !emailIsValid(email) && email.length > 0 ? "email is invalid" : "";

        const handleMailInput = (e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
        }


        const handleFormSubmit = (e) => {
            e.preventDefault()
        }
        return (
            {
                email: email,
                emailError: emailError,
                canSubmit: canSubmit,
                handleMailInput,
                handleFormSubmit
            }
        )
}
export default useResetPassword;