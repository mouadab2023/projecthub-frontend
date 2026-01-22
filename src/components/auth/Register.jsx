import React from "react";
import AuthForm from "./AuthForm";
import Input from "../utilis/Input";
import useRegister from "../../hooks/auth/useRegister";

const Register = () => {
    const {
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
    } = useRegister();
    return (
        <AuthForm
            introduction="Join projectHub  🚀"
            title="Create your account to start managing your projects"
            submitLabel="Sign up"
            canSubmit={canSubmit}
            onSubmit={handleFormSubmit}

        >
            <Input
                value={firstName}
                type="text"
                name="First Name"
                placeholder="Alex"
                errorMessage={firstNameError}
                onChange={handleFirstNameInput}
            />
            <Input
                value={lastName}
                type="text"
                name="Last Name"
                placeholder="Dupont"
                errorMessage={lastNameError}
                onChange={handleLastNameInput}
            />
            <Input
                value={email}
                type="email"
                name="Email"
                placeholder="you@example.com"
                errorMessage={emailError}
                onChange={handleMailInput}
            />

            <Input
                value={password}
                type="password"
                name="Password"
                placeholder="••••••••"
                errorMessage={passwordError}
                onChange={handlePasswordInput}
            />
            <Input
                value={confirmPassword}
                type="password"
                name="Confirm your password"
                placeholder="••••••••"
                errorMessage={confirmPasswordError}
                onChange={handleConfirmationPasswordInput}
            />

        </AuthForm>

    )
}
export default Register;