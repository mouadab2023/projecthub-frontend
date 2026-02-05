import React from "react";
import AuthFooter from "./components/AuthFooter";
import AuthForm from "./components/AuthForm";
import Input from "../ui/Input";
import useResetPassword from "../../hooks/auth/useResetPassword";
import ErrorMessage from "../ui/ErrorMessage";
const ResetPassword = () => {
    const {email,emailError,handleMailInput,handleFormSubmit,canSubmit,errorMessage}=useResetPassword();
    return (

        <AuthForm
            introduction="Forgot your password?"
            title="Enter your email and we’ll send you a reset link"
            submitLabel="Send Reset Link"
            canSubmit={canSubmit}
            onSubmit={handleFormSubmit}
            footer={
                <AuthFooter
                    footerText="Remember your password ?"
                    footerLinkLabel="Back to Login"
                    footerLinkTo="/login"
                />
            }
        >

            <Input
                value={email}
                type="email"
                name="Email"
                placeholder="you@example.com"
                onChange={handleMailInput}
                errorMessage={emailError}
            />

            <ErrorMessage message={errorMessage} />

        </AuthForm>
    )
}
export default ResetPassword