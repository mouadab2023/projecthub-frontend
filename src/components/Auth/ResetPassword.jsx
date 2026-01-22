import React from "react";
import AuthFooter from "./AuthFooter";
import AuthForm from "./AuthForm";
import Input from "../Utilis/Input";
import useResetPassword from "../../hooks/useResetPassword";
const ResetPassword = () => {
    const {email,emailError,handleMailInput,handleFormSubmit,canSubmit}=useResetPassword();
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
        </AuthForm>

    )
}
export default ResetPassword