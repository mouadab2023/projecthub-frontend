import {useState} from "react";
const useLogin =() => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailIsValid =(email)=>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    const canSubmit = emailIsValid(email);
    const emailError= !emailIsValid(email) && email.length>0 ?"email is invalid":"";

    const handleMailInput =  (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordInput = (e)=> {
        setPassword(e.target.value);
    }
    const handleFormSubmit =  (e) => {
        e.preventDefault()
    }
    return (
        {
            email: email,
            emailError:emailError,
            password: password,
            canSubmit: canSubmit,
            handleMailInput,
            handlePasswordInput,
            handleFormSubmit
        }
    )
}
export default useLogin;