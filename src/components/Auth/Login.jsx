import React from "react";
import Input from "../Utilis/Input";
import AuthForm from "./AuthForm";
import {Link} from "react-router-dom";
import AuthFooter from "./AuthFooter";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const {email, emailError, password, canSubmit, handleFormSubmit, handleMailInput, handlePasswordInput} = useLogin();
    return (

        <AuthForm
            introduction="Welcome Back 👋"
            title="Sign in to continue to ProjectHub"
            submitLabel="Sign in"
            canSubmit={canSubmit}
            onSubmit={handleFormSubmit}
            footer={
                <AuthFooter
                    footerText="Don’t have an account?"
                    footerLinkLabel="Sign up"
                    footerLinkTo="/register"
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

            <Input
                value={password}
                type="password"
                name="Password"
                placeholder="••••••••"
                onChange={handlePasswordInput}
            />

            <div className="flex justify-end text-sm">
                <Link
                    to="/reset-password"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Forgot password ?
                </Link>
            </div>
        </AuthForm>

    );
};

export default Login;
